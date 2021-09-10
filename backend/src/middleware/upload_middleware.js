const multer = require("multer");

// storage configuration for multer 
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, callback) => {
        // prevent duplicates
        callback(null, file.originalname + '-' + Date.now());
    },
});

const csvFilter = (req, file, callback) => {
    if (file.mimetype.includes("csv")) {
        callback(null, true);
    } else {
        callback("Please upload only csv file.", false);
    }
};

var uploadMiddleware = multer({ storage: storage, fileFilter: csvFilter });

module.exports = uploadMiddleware;