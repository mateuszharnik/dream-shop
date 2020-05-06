const { Router } = require('express');
const { getFAQCategories } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getFAQCategories,
);

module.exports = router;
