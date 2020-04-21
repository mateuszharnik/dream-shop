const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const { updateContact, getContact } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getContact,
);

router.put(
  '/',
  isNotLoggedIn,
  isAdmin,
  updateContact,
);

module.exports = router;
