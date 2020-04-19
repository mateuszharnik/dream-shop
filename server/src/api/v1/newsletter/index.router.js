const { Router } = require('express');
const {
  getEmails, addEmail, deleteEmails, deleteEmail,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  getEmails,
);

router.post(
  '/',
  addEmail,
);

router.delete(
  '/',
  deleteEmails,
);

router.delete(
  '/:id',
  deleteEmail,
);

module.exports = router;
