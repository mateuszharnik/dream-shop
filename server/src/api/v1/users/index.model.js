const Joi = require('joi');
const { userRolesMessages } = require('../../../helpers/errors/messages/roles');
const { emailMessages } = require('../../../helpers/errors/messages/email');
const { avatarMessages } = require('../../../helpers/errors/messages/avatar');
const { nameMessages } = require('../../../helpers/errors/messages/name');
const { ADMIN, USER } = require('../../../helpers/constants/users');
const { NEW_PASSWORD } = require('../../../helpers/constants/auth');
const {
  usernameMessages,
} = require('../../../helpers/errors/messages/username');
const {
  nameRegExp,
  emailRegExp,
  avatarRegExp,
} = require('../../../helpers/regexp');
const {
  passwordMessages,
  confirmPasswordMessages,
  newPasswordMessages,
} = require('../../../helpers/errors/messages/password');
const {
  nameMinLength,
  nameMaxLength,
  usernameMinLength,
  usernameMaxLength,
  passwordMinLength,
  passwordMaxLength,
  newPasswordMinLength,
  newPasswordMaxLength,
} = require('../../../helpers/variables/users');
const {
  resetPasswordTokenExpMessages,
  resetPasswordTokenMessages,
} = require('../../../helpers/errors/messages/reset-password-token');

const password = Joi.string().trim().required().messages(passwordMessages);

const newPassword = Joi.string()
  .trim()
  .min(newPasswordMinLength)
  .max(newPasswordMaxLength)
  .required()
  .messages(newPasswordMessages);

const userSchema = (user) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .regex(nameRegExp)
      .min(nameMinLength)
      .max(nameMaxLength)
      .allow('')
      .required()
      .messages(nameMessages),
    username: Joi.string()
      .trim()
      .alphanum()
      .min(usernameMinLength)
      .max(usernameMaxLength)
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
      .messages(avatarMessages),
    password: Joi.string()
      .min(passwordMinLength)
      .max(passwordMaxLength)
      .required()
      .messages(passwordMessages),
    roles: Joi.array()
      .items(
        Joi.string().trim().valid(USER).required(),
        Joi.string().trim().valid(ADMIN),
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
  });

  const { error: schemaError, value: data } = schema.validate(user);

  return { schemaError, data };
};

const updateUserSchema = (user) => {
  const checkNewPassword = () => user && user.new_password && user.confirm_new_password;

  const checkPassword = () => user && user.password;

  const schema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .regex(nameRegExp)
      .min(nameMinLength)
      .max(nameMaxLength)
      .allow('')
      .required()
      .messages(nameMessages),
    username: Joi.string()
      .trim()
      .alphanum()
      .min(usernameMinLength)
      .max(usernameMaxLength)
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
      .messages(avatarMessages),
    password: checkNewPassword() ? password : password.allow(''),
    new_password: checkPassword() ? newPassword : newPassword.allow(''),
    confirm_new_password: Joi.string()
      .trim()
      .valid(Joi.ref(NEW_PASSWORD))
      .required()
      .messages(confirmPasswordMessages),
  });

  const { error: schemaError, value: data } = schema.validate(user);

  return { schemaError, data };
};

module.exports = {
  userSchema,
  updateUserSchema,
};
