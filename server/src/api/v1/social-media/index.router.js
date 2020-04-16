const { Router } = require('express');
const { getSocialMedia, updateSocialMedia } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getSocialMedia,
);

router.put(
  '/',
  updateSocialMedia,
);

module.exports = router;
