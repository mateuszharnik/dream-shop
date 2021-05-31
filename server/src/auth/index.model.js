const Joi = require('joi');
const { emailRegExp, usernameRegExp } = require('../helpers/regexp');
const { resetPasswordIdMessages } = require('../helpers/errors/messages/id');
const { emailMessages } = require('../helpers/errors/messages/email');
const { PASSWORD } = require('../helpers/variables/constants/auth');
const {
  passwordMinLength,
  passwordMaxLength,
} = require('../helpers/variables/users');
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
    username: Joi.string()
      .trim()
      .regex(usernameRegExp)
      .required()
      .messages(usernameMessages),
    password: Joi.string().trim().required().messages(loginPasswordMessages),
  });

  const { error: schemaError, value: data } = schema.validate(credentials);

  return { schemaError, data };
};

const resetPasswordIdSchema = (id) => {
  const schema = Joi.object().keys({
    id: Joi.string().trim().required().messages(resetPasswordIdMessages),
  });

  const { error: schemaError, value: data } = schema.validate(id);

  return { schemaError, data };
};

const recoveryLinkSchema = (email) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .required()
      .messages(emailMessages),
  });

  const { error: schemaError, value: data } = schema.validate(email);

  return { schemaError, data };
};

const recoveryPasswordSchema = (passwords) => {
  const schema = Joi.object().keys({
    password: Joi.string()
      .trim()
      .min(passwordMinLength)
      .max(passwordMaxLength)
      .required()
      .messages(passwordMessages),
    confirm_password: Joi.string()
      .trim()
      .valid(Joi.ref(PASSWORD))
      .required()
      .messages(confirmPasswordMessages),
  });

  const { error: schemaError, value: data } = schema.validate(passwords);

  return { schemaError, data };
};

module.exports = {
  loginSchema,
  recoveryLinkSchema,
  recoveryPasswordSchema,
  resetPasswordIdSchema,
};
