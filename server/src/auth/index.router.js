const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const { isLoggedIn } = require('../middlewares/auth');
const {
  loginLimiterTime,
  loginLimiterLength,
  loginLimiterMessage,
  recoveryLimiterTime,
  recoveryLimiterLength,
  recoveryLimiterMessage,
} = require('../helpers/variables/limiter');
const {
  createData,
  createResponseWithError,
} = require('../middlewares/index');
const {
  validateRecoveryPasswords,
  validateCredentials,
  validateRecoveryLink,
  validateRecoveryId,
} = require('./index.middlewares');
const {
  loginUser,
  sendRecoveryLink,
  recoveryPassword,
  checkRecoveryLink,
} = require('./index.controller');

const loginLimiter = rateLimit({
  windowMs: loginLimiterTime,
  max: loginLimiterLength,
  message: loginLimiterMessage,
});

const recoveryLimiter = rateLimit({
  windowMs: recoveryLimiterTime,
  max: recoveryLimiterLength,
  message: recoveryLimiterMessage,
});

const router = Router();

router.post(
  '/login',
  createData,
  createResponseWithError,
  isLoggedIn,
  validateCredentials,
  loginLimiter,
  loginUser,
);

router.post(
  '/recovery',
  createData,
  createResponseWithError,
  isLoggedIn,
  validateRecoveryLink,
  recoveryLimiter,
  sendRecoveryLink,
);

router.get(
  '/recovery/:id',
  createData,
  createResponseWithError,
  isLoggedIn,
  validateRecoveryId,
  checkRecoveryLink,
);

router.put(
  '/recovery/:id',
  createData,
  createResponseWithError,
  isLoggedIn,
  validateRecoveryId,
  validateRecoveryPasswords,
  recoveryPassword,
);

module.exports = router;
