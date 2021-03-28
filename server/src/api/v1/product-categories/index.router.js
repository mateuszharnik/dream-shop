const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const {
  addProductCategory,
  getProductCategories,
  deleteProductCategories,
  deleteProductCategory,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  getProductCategories,
);

router.post(
  '/',
  isNotLoggedIn,
  isAdmin,
  addProductCategory,
);

router.delete(
  '/',
  isNotLoggedIn,
  isAdmin,
  deleteProductCategories,
);

router.delete(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  deleteProductCategory,
);

module.exports = router;
