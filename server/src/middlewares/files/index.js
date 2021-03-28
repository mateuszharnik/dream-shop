const multer = require('multer');
const { extname } = require('path');
const { AVATARS, PRODUCTS } = require('../../helpers/constants/directories');

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./${AVATARS}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
  },
});

const avatarUpload = multer({ storage: avatarStorage });

const productsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./${PRODUCTS}`);
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
