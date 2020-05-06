const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  addProductCategories, getProductCategories,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  getProductCategories,
);

router.post(
  '/',
  // isNotLoggedIn,
  // isAdmin,
  addProductCategories,
);

module.exports = router;
