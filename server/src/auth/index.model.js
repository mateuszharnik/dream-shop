const Joi = require('@hapi/joi');

const loginSchema = Joi.object().keys({
  username: Joi.string().trim().required(),
  password: Joi.string().required(),
});

module.exports = { loginSchema };
