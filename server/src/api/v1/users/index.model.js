const Joi = require('@hapi/joi');
const { nameRegExp, emailRegExp, avatarRegExp } = require('../../../helpers/regexp');
const { usernameMessages } = require('../../../helpers/errors/messages/username');
const { passwordMessages, confirmPasswordMessages, newPasswordMessages } = require('../../../helpers/errors/messages/password');
const { userRolesMessages } = require('../../../helpers/errors/messages/roles');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { imgMessages } = require('../../../helpers/errors/messages/avatar');
const { nameMessages } = require('../../../helpers/errors/messages/name');
const { resetPasswordTokenExpMessages, resetPasswordTokenMessages } = require('../../../helpers/errors/messages/reset-password-token');
const { joiConfigMessages } = require('../../../helpers/errors/messages');

const password = Joi.string().trim().required().messages(passwordMessages);

const newPassword = Joi.string()
  .trim()
  .min(8)
  .max(32)
  .required()
  .messages(newPasswordMessages);

const userSchema = (user) => {
  const schema = Joi.object()
    .keys({
      name: Joi.string()
        .trim()
        .regex(nameRegExp)
        .min(3)
        .max(30)
        .allow('')
        .required()
        .messages(nameMessages),
      username: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages(usernameMessages),
      email: Joi.string()
        .trim()
        .regex(emailRegExp)
        .required()
        .messages(emailMessages),
      avatar: Joi.string()
        .trim()
        .regex(avatarRegExp)
        .allow('')
        .required()
        .messages(imgMessages),
      password: Joi.string()
        .min(8)
        .max(32)
        .required()
        .messages(passwordMessages),
      roles: Joi.array()
        .items(
          Joi.string().trim().valid('user').required(),
          Joi.string().trim().valid('administrator'),
        )
        .required()
        .messages(userRolesMessages),
      reset_password_token: Joi.string()
        .allow(null)
        .required()
        .messages(resetPasswordTokenMessages),
      reset_password_token_exp: Joi.number()
        .allow(null)
        .required()
        .messages(resetPasswordTokenExpMessages),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(user);

  return { schemaError, data };
};

const updateUserSchema = (user) => {
  const checkNewPassword = () => user && user.new_password && user.confirm_new_password;

  const checkPassword = () => user && user.password;

  const schema = Joi.object()
    .keys({
      name: Joi.string()
        .trim()
        .regex(nameRegExp)
        .min(3)
        .max(30)
        .allow('')
        .required()
        .messages(nameMessages),
      username: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages(usernameMessages),
      email: Joi.string()
        .trim()
        .regex(emailRegExp)
        .required()
        .messages(emailMessages),
      avatar: Joi.string()
        .trim()
        .regex(avatarRegExp)
        .allow('')
        .required()
        .messages(imgMessages),
      password: checkNewPassword() ? password : password.allow(''),
      new_password: checkPassword() ? newPassword : newPassword.allow(''),
      confirm_new_password: Joi.string()
        .trim()
        .valid(Joi.ref('new_password'))
        .required()
        .messages(confirmPasswordMessages),
    })
    .required()
    .messages(joiConfigMessages);

  const { error: schemaError, value: data } = schema.validate(user);

  return { schemaError, data };
};

module.exports = {
  userSchema,
  updateUserSchema,
};
