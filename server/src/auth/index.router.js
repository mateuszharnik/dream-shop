const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { isLoggedIn } = require('./index.middlewares');
const {
  loginUser,
  sendRecoveryLink,
  recoveryPassword,
  checkRecoveryLink,
} = require('./index.controller');

const loginLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 20,
  message: 'Przekroczono limit. Spróbuj zalogować się ponownie później',
});

const recoveryLimiter = rateLimit({
  windowMs: 1000 * 60 * 60,
  max: 10,
  message: 'Przekroczono limit. Spróbuj wysłać wiadomość ponownie później',
});

const router = Router();

router.post(
  '/login',
  loginLimiter,
  isLoggedIn,
  loginUser,
);

router.post(
  '/recovery',
  recoveryLimiter,
  isLoggedIn,
  sendRecoveryLink,
);

router.get(
  '/recovery/:id',
  isLoggedIn,
  checkRecoveryLink,
);

router.put(
  '/recovery/:id',
  isLoggedIn,
  recoveryPassword,
);

module.exports = router;
