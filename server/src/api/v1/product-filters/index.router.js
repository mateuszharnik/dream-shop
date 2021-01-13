const { Router } = require('express');
const { getProductFilters } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getProductFilters,
);

module.exports = router;
