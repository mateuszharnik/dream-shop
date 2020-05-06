const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  getMessages, getMessage, sendMessage, deleteMessages, deleteMessage,
} = require('./index.controller');

const sendMessageLimiter = rateLimit({
  windowMs: 1000 * 60 * 5,
  max: 2,
  message: 'Przekroczono limit. Spróbuj wysłać wiadomość ponownie później',
});

const router = Router();

router.get(
  '/',
  // isNotLoggedIn,
  // isAdmin,
  getMessages,
);

router.get(
  '/:id',
  // isNotLoggedIn,
  // isAdmin,
  getMessage,
);

router.post(
  '/',
  sendMessageLimiter,
  sendMessage,
);

router.delete(
  '/',
  // isNotLoggedIn,
  // isAdmin,
  deleteMessages,
);

router.delete(
  '/:id',
  // isNotLoggedIn,
  // isAdmin,
  deleteMessage,
);

module.exports = router;
