const multer = require('multer');
const { extname } = require('path');

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
  },
});

const avatarUpload = multer({ storage: avatarStorage });

module.exports = {
  avatarUpload,
};
