const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getFAQs, getFAQ, updateFAQ, deleteFAQ, addFAQ, deleteFAQs,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  getFAQs,
);

router.get(
  '/:id',
  getFAQ,
);

router.post(
  '/',
  isNotLoggedIn,
  isAdmin,
  addFAQ,
);

router.put(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  updateFAQ,
);

router.delete(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  deleteFAQ,
);

router.delete(
  '/',
  isNotLoggedIn,
  isAdmin,
  deleteFAQs,
);

module.exports = router;
