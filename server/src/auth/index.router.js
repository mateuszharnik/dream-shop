const rateLimit = require('express-rate-limit');
const { Router } = require('express');
const { isLoggedIn } = require('../middlewares/auth');
const { MEDIUM, LOGIN, RECOVERY } = require('../helpers/constants/limiter');
const { FIFTEEN_MINUTES } = require('../helpers/constants/time');
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
  windowMs: FIFTEEN_MINUTES,
  max: MEDIUM,
  message: LOGIN,
});

const recoveryLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: MEDIUM,
  message: RECOVERY,
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
