const Joi = require('@hapi/joi');
const { emailRegExp, usernameRegExp } = require('../helpers/regexp');
const { joiConfigMessages } = require('../helpers/errors/messages');
const { resetPasswordIdMessages } = require('../helpers/errors/messages/id');
const { emailMessages } = require('../helpers/errors/messages/email');
const {
  usernameRequired,
  usernameNotEmpty,
  usernameString,
} = require('../helpers/errors/messages/username');
const {
  passwordRequired,
  passwordNotEmpty,
  passwordString,
  passwordMessages,
  confirmPasswordMessages,
} = require('../helpers/errors/messages/password');

const usernameMessages = {
  ...usernameRequired,
  ...usernameNotEmpty,
  ...usernameString,
};

const loginPasswordMessages = {
  ...passwordRequired,
  ...passwordNotEmpty,
  ...passwordString,
};

const loginSchema = (credentials) => {
  const schema = Joi.object().keys({
    username: Joi.string().trim().regex(usernameRegExp).required()
      .messages(usernameMessages),
    password: Joi.string().trim().required().messages(loginPasswordMessages),
  }).required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(credentials);

  return { schemaError, data };
};

const resetPasswordIdSchema = (id) => {
  const schema = Joi.object()
    .keys({
      id: Joi.string().trim().required().messages(resetPasswordIdMessages),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(id);

  return { schemaError, data };
};

const recoveryLinkSchema = (email) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string()
        .trim()
        .regex(emailRegExp)
        .required()
        .messages(emailMessages),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(email);

  return { schemaError, data };
};

const recoveryPasswordSchema = (passwords) => {
  const schema = Joi.object()
    .keys({
      password: Joi.string()
        .trim()
        .min(8)
        .max(32)
        .required()
        .messages(passwordMessages),
      confirm_password: Joi.string()
        .trim()
        .valid(Joi.ref('password'))
        .required()
        .messages(confirmPasswordMessages),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(passwords);

  return { schemaError, data };
};

module.exports = {
  loginSchema,
  recoveryLinkSchema,
  recoveryPasswordSchema,
  resetPasswordIdSchema,
};
