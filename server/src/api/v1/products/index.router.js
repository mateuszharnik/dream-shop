const { Router } = require('express');
const { productUpload } = require('../../../middlewares/files');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getProducts, getProduct, addProduct, deleteProduct, updateProduct, deleteProducts,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  getProducts,
);

router.get(
  '/:id',
  getProduct,
);

router.post(
  '/',
  isNotLoggedIn,
  isAdmin,
  productUpload.fields([{
    name: 'thumbnail', maxCount: 1,
  }, {
    name: 'gallery', maxCount: 9,
  }]),
  addProduct,
);

router.put(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  productUpload.fields([{
    name: 'thumbnail', maxCount: 1,
  }, {
    name: 'gallery', maxCount: 9,
  }]),
  updateProduct,
);

router.delete(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  deleteProduct,
);

router.delete(
  '/',
  isNotLoggedIn,
  isAdmin,
  deleteProducts,
);

module.exports = router;
