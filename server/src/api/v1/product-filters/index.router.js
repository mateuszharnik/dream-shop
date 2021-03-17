const { Router } = require('express');
const { getProductFilters } = require('./index.controller');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getProductFilters,
);

module.exports = router;
