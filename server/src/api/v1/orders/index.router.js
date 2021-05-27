const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const { validateDBId } = require('../../../middlewares/validation');
const { getSkipAndLimit } = require('../../../middlewares/queries');
const {
  validateOrder,
  findOrder,
  updateProducts,
  findProducts,
  checkExistingProducts,
  checkEnoughProductsQuantity,
  checkChangedProducts,
} = require('./index.middleware');
const {
  getOrders,
  getOrder,
  addOrder,
  deleteOrder,
  refuseOrder,
  acceptOrder,
  deleteOrders,
  paidOrder,
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
  isNotLoggedIn,
  isAdmin,
  getSkipAndLimit,
  getOrders,
);

router.get(
  '/:id',
  createData,
  createResponseWithError,
  validateDBId,
  findOrder,
  getOrder,
);

router.post(
  '/',
  createData,
  createResponseWithError,
  validateOrder,
  findProducts,
  checkExistingProducts,
  checkEnoughProductsQuantity,
  checkChangedProducts,
  updateProducts(true),
  addOrder,
);

router.put(
  '/pay/:id',
  createData,
  createResponseWithError,
  validateDBId,
  findOrder,
  paidOrder,
);

router.put(
  '/refuse/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  findOrder,
  findProducts,
  updateProducts(),
  refuseOrder,
);

router.put(
  '/accept/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  findOrder,
  acceptOrder,
);

router.delete(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  findOrder,
  deleteOrder,
);

router.delete(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  deleteOrders,
);

module.exports = router;
