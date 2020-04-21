const { Router } = require('express');
const { updateAbout, getAbout } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getAbout,
);

router.put(
  '/',
  updateAbout,
);

module.exports = router;
