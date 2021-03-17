const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const { validateDBId } = require('../../../middlewares/validation');
const { validateSocialMedia } = require('./index.middleware');
const { getSocialMedia, updateSocialMedia } = require('./index.controller');

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getSocialMedia,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  validateSocialMedia,
  updateSocialMedia,
);

module.exports = router;
