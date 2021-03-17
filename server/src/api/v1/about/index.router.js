const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const { validateDBId } = require('../../../middlewares/validation');
const { validateAbout } = require('./index.middleware');
const { updateAbout, getAbout } = require('./index.controller');

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getAbout,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  validateAbout,
  updateAbout,
);

module.exports = router;
