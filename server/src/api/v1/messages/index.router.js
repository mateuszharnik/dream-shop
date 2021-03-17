const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const {
  limiterConstants,
  limiterTimeConstants,
  limiterAttemptsConstants,
} = require('../../../helpers/constants');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const { validateDBId } = require('../../../middlewares/validation');
const { getSkipAndLimit } = require('../../../middlewares/queries');
const { validateMessage } = require('./index.middleware');
const {
  getMessages,
  getMessage,
  addMessage,
  deleteMessages,
  deleteMessage,
} = require('./index.controller');

const { MESSAGE } = limiterConstants;
const { SMALL } = limiterAttemptsConstants;
const { FIVE_MINUTES } = limiterTimeConstants;

const messageLimiter = rateLimit({
  windowMs: FIVE_MINUTES,
  max: SMALL,
  message: MESSAGE,
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
