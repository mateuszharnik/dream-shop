const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const { validateDBId } = require('../../../middlewares/validation');
const { validateRegulation } = require('./index.middleware');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const {
  getRegulations,
  updateRegulation,
  getRegulation,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getRegulations,
);

router.get(
  '/:id',
  createData,
  createResponseWithError,
  validateDBId,
  getRegulation,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  validateRegulation,
  updateRegulation,
);

module.exports = router;
