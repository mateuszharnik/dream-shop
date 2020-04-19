const Joi = require('@hapi/joi');
const { nameRegExp, emailRegExp } = require('../../../helpers/regexp');
const { usernameMessages } = require('../../../helpers/errors/messages/username');
const { passwordMessages } = require('../../../helpers/errors/messages/password');
const { userRolesMessages } = require('../../../helpers/errors/messages/roles');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { imgMessages } = require('../../../helpers/errors/messages/img');
const { nameMessages } = require('../../../helpers/errors/messages/name');
const { resetPasswordTokenExpMessages, resetPasswordTokenMessages } = require('../../../helpers/errors/messages/reset-password-token');
const { joiConfigObject } = require('../../../helpers/errors/messages');
const { _id, timestamps } = require('../../../helpers/schemas');

const userConfig = {
  name: Joi.string().trim().regex(nameRegExp).min(3)
    .max(30)
    .allow('')
    .required()
    .messages(nameMessages),
  username: Joi.string().trim().alphanum().min(3)
    .max(30)
    .required()
    .messages(usernameMessages),
  email: Joi.string().trim().regex(emailRegExp).required()
    .messages(emailMessages),
  img: Joi.string().trim().allow('').required()
    .messages(imgMessages),
  password: Joi.string().min(8).max(32).required()
    .messages(passwordMessages),
  roles: Joi.array().items(
    Joi.string().trim().valid('user').required(),
    Joi.string().trim().valid('administrator'),
  ).required().messages(userRolesMessages),
  reset_password_token: Joi.string().allow(null)
    .required().messages(resetPasswordTokenMessages),
  reset_password_token_exp: Joi.number().allow(null)
    .required().messages(resetPasswordTokenExpMessages),
  ...timestamps,
};

const userSchema = (user, withId = true) => {
  const schema = Joi.object().keys(withId ? {
    _id,
    ...userConfig,
  } : userConfig).messages(joiConfigObject);

  const { error: schemaError, value: data } = schema.validate(user);

  return { schemaError, data };
};

module.exports = {
  userSchema,
};
