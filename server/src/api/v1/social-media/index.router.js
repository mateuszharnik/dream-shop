const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const { getSocialMedia, updateSocialMedia } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getSocialMedia,
);

router.put(
  '/',
  isNotLoggedIn,
  isAdmin,
  updateSocialMedia,
);

module.exports = router;
