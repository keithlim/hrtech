const fs = require("fs");
const csv = require("fast-csv");

const upload = async (req, res) => {
    try {

        if (req.file == undefined) {
            return res.status(400).send("Please upload a CSV file!");
        }

        let rows = [];

        let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;

        // https://nodejs.org/api/stream.html#stream_class_stream_readable
        fs.createReadStream(path)
            .pipe(csv.parse({ headers: true })) // first row treated as headers
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                console.log(`pusing row: ${row}`);
                rows.push(row);
            })
            .on("end", () => {
                // do db logic
                res.send(`worked`);
            });
    } catch (error) {
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

module.exports = { upload };
