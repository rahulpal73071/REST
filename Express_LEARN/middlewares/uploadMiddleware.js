const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const isValid = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
  cb(isValid ? null : new Error("Only image files"), isValid);
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter
});

module.exports = upload;
