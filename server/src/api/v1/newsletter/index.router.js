const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getEmails, addEmail, deleteEmails, deleteEmail,
} = require('./index.controller');

const router = Router();

const sendNewsletterLimiter = rateLimit({
  windowMs: 1000 * 60 * 5,
  max: 2,
  message: 'Przekroczono limit. Spróbuj zapisać się ponownie później.',
});

router.get(
  '/',
  isNotLoggedIn,
  isAdmin,
  getEmails,
);

router.post(
  '/',
  sendNewsletterLimiter,
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
