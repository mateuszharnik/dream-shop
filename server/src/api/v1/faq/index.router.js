const { Router } = require('express');
const {
  getFAQCategories, getFAQs, getFAQ, updateFAQ, deleteFAQ, addFAQ,
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
  addFAQ,
);

router.put(
  '/:id',
  updateFAQ,
);

router.delete(
  '/:id',
  deleteFAQ,
);

router.get(
  '/categories',
  getFAQCategories,
);

module.exports = router;
