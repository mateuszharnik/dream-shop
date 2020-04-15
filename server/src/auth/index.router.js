const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { loginUser } = require('./index.controller');

const loginLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 20,
  message: 'Przekroczono limit. Spróbuj zalogować się ponownie później',
});

const router = Router();

router.post(
  '/login',
  loginLimiter,
  loginUser,
);

module.exports = router;
