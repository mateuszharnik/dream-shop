const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const { validateDBId } = require('../../../middlewares/validation');
const { validateContact } = require('./index.middleware');
const { updateContact, getContact } = require('./index.controller');

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getContact,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  validateContact,
  updateContact,
);

module.exports = router;
