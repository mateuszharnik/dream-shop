const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const { updateAbout, getAbout } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getAbout,
);

router.put(
  '/',
  isNotLoggedIn,
  isAdmin,
  updateAbout,
);

module.exports = router;
