const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getProducts, getProduct, addProduct, deleteProduct, updateProduct,
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
  addProduct,
);

router.put(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  updateProduct,
);

router.delete(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  deleteProduct,
);

module.exports = router;
