const { Router } = require('express');
const { getFAQCategories } = require('./index.controller');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  getFAQCategories,
);

module.exports = router;
