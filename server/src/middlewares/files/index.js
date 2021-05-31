const multer = require('multer');
const { extname } = require('path');
const {
  AVATARS_DIR,
  PRODUCTS_DIR,
} = require('../../helpers/variables/constants/directories');

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./${AVATARS_DIR}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
  },
});

const avatarUpload = multer({ storage: avatarStorage });

const productsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./${PRODUCTS_DIR}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
  },
});

const productUpload = multer({ storage: productsStorage });

module.exports = {
  avatarUpload,
  productUpload,
};
