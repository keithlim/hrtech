const router = require('express-promise-router')();

const csvController = require("../controllers/csv_controller");
const helperController = require("../controllers/helper_controller");
const uploadMiddleware = require("../middleware/upload_middleware");

const db = require("../db/pg-util");

router.post('/upload', uploadMiddleware.single("file"), csvController.upload);

router.get('/', async function (req, res) {

    const queryParams = req.query;
    // console.log(queryParams);

    helperController.validateParams(queryParams, (valid) => {
        if (!valid) {
            res.status(400).send()
        }
        else {
            const sortStr = helperController.getSort(queryParams.sort);
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

module.exports = router;