const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const {
  limiterConstants,
  limiterTimeConstants,
  limiterAttemptsConstants,
} = require('../../../helpers/constants');
const { isAdmin, isNotLoggedIn } = require('../../../auth/index.middlewares');
const { getSkipAndLimit } = require('../../../middlewares/queries');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const { validateDBId } = require('../../../middlewares/validation');
const { validateNewsletter } = require('./index.middleware');
const {
  getEmails,
  addEmail,
  deleteEmails,
  deleteEmail,
} = require('./index.controller');

const { NEWSLETTER } = limiterConstants;
const { SMALL } = limiterAttemptsConstants;
const { FIVE_MINUTES } = limiterTimeConstants;

const newsletterLimiter = rateLimit({
  windowMs: FIVE_MINUTES,
  max: SMALL,
  message: NEWSLETTER,
});

const router = Router();

router.get(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  getSkipAndLimit,
  getEmails,
);

router.post(
  '/',
  createData,
  createResponseWithError,
  validateNewsletter,
  newsletterLimiter,
  addEmail,
);

router.delete(
  '/',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  deleteEmails,
);

router.delete(
  '/:id',
  createData,
  createResponseWithError,
  isNotLoggedIn,
  isAdmin,
  validateDBId,
  deleteEmail,
);

module.exports = router;
