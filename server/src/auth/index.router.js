const { Router } = require('express');
const rateLimit = require('express-rate-limit');
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
  loginUser,
);

router.post(
  '/recovery',
  recoveryLimiter,
  sendRecoveryLink,
);

router.get(
  '/recovery/:id',
  checkRecoveryLink,
);

router.put(
  '/recovery/:id',
  recoveryPassword,
);

module.exports = router;
