const router = require('express-promise-router')();

const csvController = require("../controllers/csv.controller");
const uploadFile = require("../middleware/uploadFile");

router.post('/upload', uploadFile.single("file"), csvController.upload);

module.exports = router;