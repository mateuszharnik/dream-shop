const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const { getMap, updateMap } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getMap,
);

router.put(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  updateMap,
);

module.exports = router;
