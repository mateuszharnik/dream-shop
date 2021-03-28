const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const { FIVE_MINUTES } = require('../../../helpers/constants/time');
const { SMALL, NEWSLETTER } = require('../../../helpers/constants/limiter');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
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
