const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const { validateDBId } = require('../../../middlewares/validation');
const { validateFAQ } = require('./index.middleware');
const {
  getFAQs,
  getFAQ,
  updateFAQ,
  deleteFAQ,
  addFAQ,
  deleteFAQs,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getFAQs,
);

router.get(
  '/:id',
  createData,
  createResponseWithError,
  validateDBId,
  getFAQ,
);

router.post(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateFAQ,
  addFAQ,
);

router.put(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  validateFAQ,
  updateFAQ,
);

router.delete(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  deleteFAQ,
);

router.delete(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  deleteFAQs,
);

module.exports = router;
