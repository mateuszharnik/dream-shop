import { ValidationError } from '@models/errors';
import { getID } from '@helpers/validation';
import {
  KEY_MATCH,
  KEY_MAX_LENGTH,
  KEY_MIN_LENGTH,
  KEY_PATTERN,
  KEY_REQUIRED,
} from '@helpers/variables/constants/validation';
import {
  confirmNewPasswordRequiredMessage,
  emailNotCorrectMessage,
  emailRequiredMessage,
  newPasswordRequiredMessage,
  newPasswordMaxLengthMessage,
  newPasswordMinLengthMessage,
  passwordsNotMatchMessage,
  passwordRequiredMessage,
  usernameNotCorrectMessage,
  usernameRequiredMessage,
} from '@helpers/variables/auth';

/* ====== Username ====== */
export const usernamePattern: ValidationError = {
  id: getID(),
  message: usernameNotCorrectMessage,
  key: KEY_PATTERN,
};

export const usernameRequired: ValidationError = {
  id: getID(),
  message: usernameRequiredMessage,
  key: KEY_REQUIRED,
};

/* ====== Password ====== */
export const passwordRequired: ValidationError = {
  id: getID(),
  message: passwordRequiredMessage,
  key: KEY_REQUIRED,
};

/* ====== New Password ====== */
export const newPasswordRequired: ValidationError = {
  id: getID(),
  message: newPasswordRequiredMessage,
  key: KEY_REQUIRED,
};

export const newPasswordMaxLength: ValidationError = {
  id: getID(),
  message: newPasswordMaxLengthMessage,
  key: KEY_MAX_LENGTH,
};

export const newPasswordMinLength: ValidationError = {
  id: getID(),
  message: newPasswordMinLengthMessage,
  key: KEY_MIN_LENGTH,
};

/* ====== Confirm Password ====== */
export const newPasswordConfirmRequired: ValidationError = {
  id: getID(),
  message: confirmNewPasswordRequiredMessage,
  key: KEY_REQUIRED,
};

export const newPasswordConfirmMatch: ValidationError = {
  id: getID(),
  message: passwordsNotMatchMessage,
  key: KEY_MATCH,
};

/* ====== Email ====== */
export const emailPattern: ValidationError = {
  id: getID(),
  message: emailNotCorrectMessage,
  key: KEY_PATTERN,
};

export const emailRequired: ValidationError = {
  id: getID(),
  message: emailRequiredMessage,
  key: KEY_REQUIRED,
};
