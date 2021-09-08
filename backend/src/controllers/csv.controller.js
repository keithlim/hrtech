const fs = require("fs");
const fastCsv = require("fast-csv");
const db = require('../db/pg-util');

const upload = async (req, res) => {

    try {
        if (req.file == undefined) {
            throw `Provided file is undefined.`;
        }

        const data = [];
        const idMap = new Set();
        const loginMap = new Set();

        const path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
        const readStream = fs.createReadStream(path);

        let csvUtil = fastCsv
            .parse({ headers: true }) // treat first row as headers
            .on("data", (row) => { // emitted when stream is passing data to consumer
                // filter commented rows
                if (row.id.charAt(0) !== '#') {

                    // check if csv has duplicated values for id & login
                    if (!idMap.has(row.id) && !loginMap.has(row.login)) {
                        // console.log(`adding ${row.id} & ${row.login}`);
                        data.push(row);
                        idMap.add(row.id);
                        loginMap.add(row.login);
                    }
                    else {
                        readStream.destroy();
                        throw "Duplicated id / login in CSV file.";
                    }

                }
            })
            .on("end", () => { // emitted when no more data is consumed from the stream
                let query = "INSERT INTO employee (id, login, name, salary) VALUES "
                let values = "";

                data.forEach(row => {
                    values += `('${row.id}','${row.login}','${row.name}','${row.salary}'),`
                });

                values = values.slice(0, -1);
                query += values + " on conflict (id) do update set id = excluded.id, login = excluded.login, name = excluded.name, salary = excluded.salary"

                db.query(query, undefined, (err, result) => {
                    if (err) {
                        res.status(400).send({
                            message: `Upload failed: ${err}`,
                        });
                    }
                    else {
                        res.send();
                    }
                });
            });

        readStream.pipe(csvUtil)
            .on("error", (error) => {
                res.status(400).send({
                    message: `Upload failed: ${error}`,
                });
            });
    } catch (error) {
        res.status(400).send({
            message: `Upload failed: ${error}`,
        });
    }

};

module.exports = { upload };
