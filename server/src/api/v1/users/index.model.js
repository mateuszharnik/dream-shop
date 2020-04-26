const Joi = require('@hapi/joi');
const {
  nameRegExp, emailRegExp, avatarRegExp, mimetypeRegExp, pathRegExp,
} = require('../../../helpers/regexp');
const { usernameMessages } = require('../../../helpers/errors/messages/username');
const { passwordMessages, confirmPasswordMessages, newPasswordMessages } = require('../../../helpers/errors/messages/password');
const { avatarMaxSize } = require('../../../helpers/files');
const { userRolesMessages } = require('../../../helpers/errors/messages/roles');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { imgMessages } = require('../../../helpers/errors/messages/avatar');
const { mimetypeMessages, pathMessages, sizeMessages } = require('../../../helpers/errors/messages/file');
const { nameMessages } = require('../../../helpers/errors/messages/name');
const { resetPasswordTokenExpMessages, resetPasswordTokenMessages } = require('../../../helpers/errors/messages/reset-password-token');
const { joiConfigMessages } = require('../../../helpers/errors/messages');
const { addId, addTimestamps } = require('../../../helpers/schemas');

const updateUserConfig = (user, id = true, timestamps = true) => {
  const checkNewPassword = () => user && user.new_password && user.confirm_new_password;

  const checkPassword = () => user && user.password;

  const password = Joi.string().trim()
    .required()
    .messages(passwordMessages);

  const newPassword = Joi.string().trim().min(8).max(32)
    .required()
    .messages(newPasswordMessages);

  let config = {
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
    avatar: Joi.string().trim().regex(avatarRegExp).allow('')
      .required()
      .messages(imgMessages),
    password: checkNewPassword() ? password : password.allow(''),
    new_password: checkPassword() ? newPassword : newPassword.allow(''),
    confirm_new_password: Joi.string().trim().valid(Joi.ref('new_password')).required()
      .messages(confirmPasswordMessages),
  };

  if (id) {
    config = addId(config);
  }

  if (timestamps) {
    config = addTimestamps(config);
  }

  return config;
};

const fileConfig = {
  path: Joi.string().trim().regex(pathRegExp).required()
    .messages(pathMessages),
  mimetype: Joi.string().trim().regex(mimetypeRegExp).required()
    .messages(mimetypeMessages),
  size: Joi.number().max(avatarMaxSize).required()
    .messages(sizeMessages),
};

const userConfig = (id = true, timestamps = true) => {
  let config = {
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
    avatar: Joi.string().trim().regex(avatarRegExp).allow('')
      .required()
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
  };

  if (id) {
    config = addId(config);
  }

  if (timestamps) {
    config = addTimestamps(config);
  }

  return config;
};

const userSchema = (user, id = true, timestamps = true) => {
  const schema = Joi.object().keys(userConfig(id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(user);

  return { schemaError, data };
};

const fileSchema = (file) => {
  const schema = Joi.object().keys(fileConfig)
    .required().unknown(true)
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(file);

  return { schemaError, data };
};

const updateUserSchema = (user, id = true, timestamps = true) => {
  const schema = Joi.object().keys(updateUserConfig(user, id, timestamps))
    .required().messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(user);

  return { schemaError, data };
};

module.exports = {
  userSchema,
  updateUserSchema,
  fileSchema,
};
