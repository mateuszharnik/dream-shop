const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getRegulations,
  updateRegulations,
  getRegulation,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  getRegulations,
);

router.get(
  '/:id',
  getRegulation,
);

router.put(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  updateRegulations,
);

module.exports = router;
