import { ValidationError } from '@models/errors';
import { getID } from '@helpers/validation';
import {
  KEY_MATCH,
  KEY_MAX_LENGTH,
  KEY_MIN_LENGTH,
  KEY_PATTERN,
  KEY_REQUIRED,
} from '@helpers/constants/validation';
import {
  CONFIRM_NEW_PASSWORD_REQUIRED,
  EMAIL_NOT_CORRECT,
  EMAIL_REQUIRED,
  NEW_PASSWORD_REQUIRED,
  NEW_PASSWORD_MAX_LENGTH,
  NEW_PASSWORD_MIN_LENGTH,
  PASSWORDS_NOT_MATCH,
  PASSWORD_REQUIRED,
  USERNAME_NOT_CORRECT,
  USERNAME_REQUIRED,
} from '@helpers/constants/auth';

/* ====== Username ====== */
export const usernamePattern: ValidationError = {
  id: getID(),
  message: USERNAME_NOT_CORRECT,
  key: KEY_PATTERN,
};

export const usernameRequired: ValidationError = {
  id: getID(),
  message: USERNAME_REQUIRED,
  key: KEY_REQUIRED,
};

/* ====== Password ====== */
export const passwordRequired: ValidationError = {
  id: getID(),
  message: PASSWORD_REQUIRED,
  key: KEY_REQUIRED,
};

/* ====== New Password ====== */
export const newPasswordRequired: ValidationError = {
  id: getID(),
  message: NEW_PASSWORD_REQUIRED,
  key: KEY_REQUIRED,
};

export const newPasswordMaxLength: ValidationError = {
  id: getID(),
  message: NEW_PASSWORD_MAX_LENGTH,
  key: KEY_MAX_LENGTH,
};

export const newPasswordMinLength: ValidationError = {
  id: getID(),
  message: NEW_PASSWORD_MIN_LENGTH,
  key: KEY_MIN_LENGTH,
};

/* ====== Confirm Password ====== */
export const newPasswordConfirmRequired: ValidationError = {
  id: getID(),
  message: CONFIRM_NEW_PASSWORD_REQUIRED,
  key: KEY_REQUIRED,
};

export const newPasswordConfirmMatch: ValidationError = {
  id: getID(),
  message: PASSWORDS_NOT_MATCH,
  key: KEY_MATCH,
};

/* ====== Email ====== */
export const emailPattern: ValidationError = {
  id: getID(),
  message: EMAIL_NOT_CORRECT,
  key: KEY_PATTERN,
};

export const emailRequired: ValidationError = {
  id: getID(),
  message: EMAIL_REQUIRED,
  key: KEY_REQUIRED,
};
