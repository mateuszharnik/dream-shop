const { Router } = require('express');
const { productUpload } = require('../../../middlewares/files');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const {
  getProducts, getProduct, addProduct, deleteProduct, updateProduct, deleteProducts,
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
  getProducts,
);

router.get(
  '/:id',
  createData,
  createResponseWithError,
  getProduct,
);

router.post(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  productUpload.fields([
    {
      name: 'thumbnail',
      maxCount: 1,
    },
    {
      name: 'gallery',
      maxCount: 9,
    },
  ]),
  addProduct,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  productUpload.fields([
    {
      name: 'thumbnail',
      maxCount: 1,
    },
    {
      name: 'gallery',
      maxCount: 9,
    },
  ]),
  updateProduct,
);

router.delete(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  deleteProduct,
);

router.delete(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  deleteProducts,
);

module.exports = router;
