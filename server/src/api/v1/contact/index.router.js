const { Router } = require('express');
const { updateContact, getContact } = require('./index.controller');

const router = Router();

router.get(
  '/',
  getContact,
);

router.put(
  '/',
  updateContact,
);

module.exports = router;
