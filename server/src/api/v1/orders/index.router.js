const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getOrders, getOrder, addOrder, deleteOrder, refuseOrder, acceptOrder, deleteOrders, paidOrder,
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
  addOrder,
);

router.put(
  '/paid/:id',
  paidOrder,
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
