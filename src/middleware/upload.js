const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null,Date.now()+"-"+file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits:{ fileSize : 1024 * 1024} // max size
});
module.exports = upload;