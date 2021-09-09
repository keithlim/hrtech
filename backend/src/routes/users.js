const router = require('express-promise-router')();

const csvController = require("../controllers/csv.controller");
const uploadFile = require("../middleware/uploadFile");

const db = require("../db/pg-util");

router.post('/upload', uploadFile.single("file"), csvController.upload);

router.get('/', async function (req, res) {
    const queryParams = req.query;
    // console.log(queryParams);

    validateParams(queryParams, (valid) => {
        if (!valid) {
            res.status(400).send()
        }
        else {
            let sortStr = getSort(queryParams.sort);
            db.query(`SELECT * FROM employee where salary >= $1 and salary <= $2 order by ${sortStr} offset $3 limit $4`,
                [
                    queryParams.minSalary, queryParams.maxSalary,
                    queryParams.offset, queryParams.limit
                ], (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(400).send({ "message from db": err });
                    }
                    res.send({ "results": result.rows });
                }
            );
        }
    });
});

function validateParams(query, callback) {
    try {
        const minSalary = query.minSalary.trim();
        const maxSalary = query.maxSalary.trim();
        const offset = query.offset.trim();
        const limit = query.limit.trim();
        const sort = query.sort.trim().toLowerCase();

        const minSalaryValid = isPositiveFloat(minSalary);
        // console.log(`minSalaryValid: ${minSalaryValid}`);
        const maxSalaryValid = isPositiveFloat(maxSalary);
        // console.log(`maxSalaryValid: ${maxSalaryValid}`);
        const offsetValid = isNormalInteger(offset);
        // console.log(`offsetValid: ${offsetValid}`);
        const limitValid = limit === "30";
        // console.log(`limitValid: ${limitValid}`);
        const sortValid = checkSortValid(sort);
        // console.log(`sortValid: ${sortValid}`);

        callback(minSalaryValid && maxSalaryValid && offsetValid && limitValid && sortValid);
    } catch (err) {
        callback(false);
    }
}

function isPositiveFloat(string) {
    return !isNaN(string) && Number(string) >= 0;
}

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

function checkSortValid(sort) {
    if (sort.length < 2) {
        return false;
    }

    const opr = sort.charAt(0);
    if (opr !== '+' && opr !== '-') {
        return false;
    }

    const col = sort.substring(1);
    const cols = ['id', 'name', 'login', 'salary'];

    if (cols.indexOf(col) == -1) {
        return false;
    }

    return true;
}

function getSort(string) {
    const opr = string.charAt(0);
    const col = string.substring(1);

    return col + " " + (opr == '+' ? 'asc' : 'desc');
}

module.exports = router;