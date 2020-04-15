const Joi = require('@hapi/joi');
const { nameRegExp, emailRegExp } = require('../../../helpers/regexp');

const userSchema = Joi.object().keys({
  name: Joi.string().trim().regex(nameRegExp).min(3)
    .max(30)
    .allow('')
    .required(),
  username: Joi.string().trim().alphanum().min(3)
    .max(30)
    .required(),
  email: Joi.string().trim().regex(emailRegExp).allow('')
    .required(),
  img: Joi.string().trim().allow('').required(),
  password: Joi.string().trim().min(8).max(32)
    .required(),
  roles: Joi.array().items(
    Joi.string().trim().valid('user').required(),
    Joi.string().trim().valid('administrator'),
  ),
  created_at: Joi.date().required(),
  updated_at: Joi.date().required(),
  deleted_at: Joi.date().allow(null).required(),
});

module.exports = { userSchema };
