const { Router } = require('express');
const { getMap, updateMap } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getMap,
);

router.put(
  '/',
  updateMap,
);

module.exports = router;
