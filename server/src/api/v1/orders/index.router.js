const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getOrders, getOrder, addOrder, deleteOrder, refuseOrder, acceptOrder, deleteOrders,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  isNotLoggedIn,
  isAdmin,
  getOrders,
);

router.get(
  '/:id',
  getOrder,
);

router.post(
  '/',
  isNotLoggedIn,
  isAdmin,
  addOrder,
);

router.put(
  '/refuse/:id',
  isNotLoggedIn,
  isAdmin,
  refuseOrder,
);

router.put(
  '/accept/:id',
  isNotLoggedIn,
  isAdmin,
  acceptOrder,
);

router.delete(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  deleteOrder,
);

router.delete(
  '/',
  isNotLoggedIn,
  isAdmin,
  deleteOrders,
);

module.exports = router;
