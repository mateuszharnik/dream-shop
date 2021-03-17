const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const { validateDBId } = require('../../../middlewares/validation');
const { validateMap } = require('./index.middleware');
const { getMap, updateMap } = require('./index.controller');

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getMap,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  validateMap,
  updateMap,
);

module.exports = router;
