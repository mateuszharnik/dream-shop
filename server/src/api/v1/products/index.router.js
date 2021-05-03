const { Router } = require('express');
const { productUpload } = require('../../../middlewares/files');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const { getSkipAndLimit } = require('../../../middlewares/queries');
const { productFields } = require('../../../helpers/files');
const { validateDBId } = require('../../../middlewares/validation');
const {
  updateThumbnail,
  updateGallery,
  validateProduct,
  getProductQueries,
  getSortQueries,
  checkIfCategoryExist,
  replaceThumbnail,
  replaceGallery,
  addProduct,
  checkIfProductCategoryExist,
  findAndUpdateProductFiltersOnAdd,
  findAndUpdateProductFiltersOnDelete,
  updateProductCategory,
  findProduct,
  findProducts,
  deleteProduct,
  deleteProducts,
  deleteThumbnailAndGalleryFiles,
  deleteProductFilters,
  deleteThumbnailAndGalleryDirectories,
  deleteProductCategories,
  updateProduct,
  findAndUpdateProductFiltersOnUpdate,
} = require('./index.middleware');
const {
  getProducts,
  getProduct,
  getAddedProduct,
  getDeletedProduct,
  getUpdatedProduct,
  getDeletedProducts,
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
  getSkipAndLimit,
  getProductQueries,
  getSortQueries,
  getProducts,
);

router.get(
  '/:id',
  createData,
  createResponseWithError,
  validateDBId,
  getProduct,
);

router.post(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  productUpload.fields(productFields),
  checkIfCategoryExist,
  replaceThumbnail,
  replaceGallery(),
  validateProduct,
  addProduct,
  checkIfProductCategoryExist,
  findAndUpdateProductFiltersOnAdd,
  updateProductCategory,
  getAddedProduct,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  productUpload.fields(productFields),
  checkIfCategoryExist,
  validateDBId,
  replaceThumbnail,
  replaceGallery(true),
  validateProduct,
  findProduct,
  checkIfProductCategoryExist,
  findAndUpdateProductFiltersOnDelete(true),
  updateProduct,
  findAndUpdateProductFiltersOnUpdate,
  updateThumbnail,
  updateGallery,
  updateProductCategory,
  getUpdatedProduct,
);

router.delete(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  findProduct,
  deleteProduct,
  findAndUpdateProductFiltersOnDelete(),
  updateProductCategory,
  deleteThumbnailAndGalleryFiles,
  getDeletedProduct,
);

router.delete(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  findProducts,
  deleteProducts,
  deleteProductFilters,
  deleteThumbnailAndGalleryDirectories,
  deleteProductCategories,
  getDeletedProducts,
);

module.exports = router;
