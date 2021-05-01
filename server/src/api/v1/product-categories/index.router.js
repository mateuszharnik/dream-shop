const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const { validateDBId } = require('../../../middlewares/validation');
const {
  validateProductCategory,
  findCategories,
  findCategory,
  deleteProductCategory,
  checkIfCategoryCanBeDeleted,
  deleteProducts,
  deleteProductFilters,
  deleteProductCategories,
  findCategoryByName,
  addProductCategory,
} = require('./index.middleware');
const {
  getProductCategories,
  getDeletedProductCategories,
  getDeletedProductCategory,
  getAddedProductCategory,
} = require('./index.controller');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getProductCategories,
);

router.post(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateProductCategory,
  findCategoryByName,
  addProductCategory,
  getAddedProductCategory,
);

router.delete(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  findCategories,
  deleteProductCategories,
  deleteProducts(true),
  deleteProductFilters(true),
  getDeletedProductCategories,
);

router.delete(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  findCategory,
  checkIfCategoryCanBeDeleted,
  deleteProductCategory,
  deleteProducts(),
  deleteProductFilters(),
  getDeletedProductCategory,
);

module.exports = router;
