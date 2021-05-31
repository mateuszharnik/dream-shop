const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const { validateDBId } = require('../../../middlewares/validation');
const { getSkipAndLimit } = require('../../../middlewares/queries');
const { validateMessage } = require('./index.middleware');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const {
  getMessages,
  getMessage,
  addMessage,
  deleteMessages,
  deleteMessage,
} = require('./index.controller');
const {
  messagesLimiterTime,
  messagesLimiterLength,
  messagesLimiterMessage,
} = require('../../../helpers/variables/limiter');

const messageLimiter = rateLimit({
  windowMs: messagesLimiterTime,
  max: messagesLimiterLength,
  message: messagesLimiterMessage,
});

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  getSkipAndLimit,
  getMessages,
);

router.get(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  getMessage,
);

router.post(
  '/',
  createData,
  createResponseWithError,
  validateMessage,
  messageLimiter,
  addMessage,
);

router.delete(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  deleteMessages,
);

router.delete(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  deleteMessage,
);

module.exports = router;
