const Joi = require('@hapi/joi');
const { emailRegExp } = require('../helpers/regexp');

const loginSchema = Joi.object().keys({
  username: Joi.string().trim().required(),
  password: Joi.string().required(),
});

const idSchema = Joi.object().keys({
  id: Joi.string().trim().required(),
});

const recoveryLinkSchema = Joi.object().keys({
  email: Joi.string().trim().regex(emailRegExp).required(),
});

const recoveryPasswordSchema = Joi.object().keys({
  password: Joi.string().min(8).max(32).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

module.exports = {
  loginSchema,
  recoveryLinkSchema,
  recoveryPasswordSchema,
  idSchema,
};
