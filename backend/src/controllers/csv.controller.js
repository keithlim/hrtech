const fs = require("fs");
const fastCsv = require("fast-csv");
const db = require('../db/pg-util');

var engaged = false;

const upload = async (req, res) => {

    const locked = this.engaged;

    if (!locked) {
        this.engaged = true;

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
                        // console.log(row);

                        const emptyValues = Object.values(row).some(x => x === null || x === '');
                        if (emptyValues) {
                            readStream.destroy();
                            throw "A record was detected to have an empty column."
                        }

                        const emptyKeys = Object.keys(row).some(x => x === null || x === '');
                        if (emptyKeys) {
                            readStream.destroy();
                            throw "A record was detected to have more columns than required."
                        }

                        // check if csv has duplicated values for id & login
                        if (!idMap.has(row.id) && !loginMap.has(row.login)) {
                            // console.log(`adding ${row.id} & ${row.login}`);
                            row.name = row.name.replace(/'/g, "''"); // to assist in including single quote characters
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

                    if (data.length === 0) {
                        this.engaged = false;

                        res.status(400).send({
                            message: `Empty file detected.`,
                        });
                    }
                    else {
                        data.forEach(row => {
                            values += `('${row.id}','${row.login}','${row.name}','${row.salary}'),`
                        });

                        values = values.slice(0, -1);
                        query += values + " on conflict (id) do update set id = excluded.id, login = excluded.login, name = excluded.name, salary = excluded.salary"
                        // console.log(query);
                        db.query(query, undefined, (err, result) => {
                            this.engaged = false;
                            if (err) {
                                res.status(400).send({
                                    message: `Error due to failure to conform to business rules.`,
                                });
                            }
                            else {
                                res.send();
                            }
                        });
                    }
                })

            readStream.pipe(csvUtil)
                .on("error", (error) => {
                    this.engaged = false;
                    res.status(400).send({
                        message: `${error}`,
                    });
                });
        } catch (error) {
            this.engaged = false;
            res.status(400).send({
                message: `${error}`,
            });
        }
    }
    else {
        res.status(503).send({
            message: `There is a current upload in progress.`,
        });
    }

};

module.exports = { upload };
