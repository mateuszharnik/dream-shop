const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const { isAdmin, isNotLoggedIn } = require('../../../middlewares/auth');
const { getSkipAndLimit } = require('../../../middlewares/queries');
const { validateDBId } = require('../../../middlewares/validation');
const { validateNewsletter } = require('./index.middleware');
const {
  createData,
  createResponseWithError,
} = require('../../../middlewares/index');
const {
  newsletterLimiterMessage,
  newsletterLimiterTime,
  newsletterLimiterLength,
} = require('../../../helpers/variables/limiter');
const {
  getEmails,
  addEmail,
  deleteEmails,
  deleteEmail,
} = require('./index.controller');

const newsletterLimiter = rateLimit({
  windowMs: newsletterLimiterTime,
  max: newsletterLimiterLength,
  message: newsletterLimiterMessage,
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
