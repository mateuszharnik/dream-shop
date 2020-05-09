const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getEmails, addEmail, deleteEmails, deleteEmail,
} = require('./index.controller');

const router = Router();

router.get(
  '/',
  isNotLoggedIn,
  isAdmin,
  getEmails,
);

router.post(
  '/',
  addEmail,
);

router.delete(
  '/',
  isNotLoggedIn,
  isAdmin,
  deleteEmails,
);

router.delete(
  '/:id',
  isNotLoggedIn,
  isAdmin,
  deleteEmail,
);

module.exports = router;
