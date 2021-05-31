import { ValidationError } from '@models/errors';
import { getID } from '@helpers/validation';
import { emailNotCorrectMessage } from '@helpers/variables/auth';
import {
  cityMatchRequiredMessage,
  cityMaxLengthMessage,
  cityMinLengthMessage,
  nipNotCorrectMessage,
  phoneNotCorrectMessage,
  streetMatchRequiredMessage,
  streetMaxLengthMessage,
  streetMinLengthMessage,
  streetNumberMatchRequiredMessage,
  streetNumberNotCorrectMessage,
  workingHoursNotCorrectMessage,
  zipCodeMatchRequiredMessage,
  zipCodeNotCorrectMessage,
} from '@helpers/variables/contact';
import {
  KEY_MATCH_REQUIRED,
  KEY_MAX_LENGTH,
  KEY_MIN_LENGTH,
  KEY_PATTERN,
} from '@helpers/variables/constants/validation';

/* ====== Email ====== */
export const emailPattern: ValidationError = {
  id: getID(),
  message: emailNotCorrectMessage,
  key: KEY_PATTERN,
};

/* ====== Phone ====== */
export const phonePattern: ValidationError = {
  id: getID(),
  message: phoneNotCorrectMessage,
  key: KEY_PATTERN,
};

/* ====== Nip ====== */
export const nipPattern: ValidationError = {
  id: getID(),
  message: nipNotCorrectMessage,
  key: KEY_PATTERN,
};

/* ====== Street ====== */
export const streetMaxLength: ValidationError = {
  id: getID(),
  message: streetMaxLengthMessage,
  key: KEY_MAX_LENGTH,
};

export const streetMinLength: ValidationError = {
  id: getID(),
  message: streetMinLengthMessage,
  key: KEY_MIN_LENGTH,
};

export const streetMatchRequired: ValidationError = {
  id: getID(),
  message: streetMatchRequiredMessage,
  key: KEY_MATCH_REQUIRED,
};

/* ====== Street Number ====== */
export const streetNumberPattern: ValidationError = {
  id: getID(),
  message: streetNumberNotCorrectMessage,
  key: KEY_PATTERN,
};

export const streetNumberMatchRequired: ValidationError = {
  id: getID(),
  message: streetNumberMatchRequiredMessage,
  key: KEY_MATCH_REQUIRED,
};

/* ====== Working Hours ====== */
export const workingHoursPattern: ValidationError = {
  id: getID(),
  message: workingHoursNotCorrectMessage,
  key: KEY_PATTERN,
};

/* ====== Zip Code ====== */
export const zipCodePattern: ValidationError = {
  id: getID(),
  message: zipCodeNotCorrectMessage,
  key: KEY_PATTERN,
};

export const zipCodeMatchRequired: ValidationError = {
  id: getID(),
  message: zipCodeMatchRequiredMessage,
  key: KEY_MATCH_REQUIRED,
};

/* ====== City ====== */
export const cityMinLength: ValidationError = {
  id: getID(),
  message: cityMinLengthMessage,
  key: KEY_MIN_LENGTH,
};

export const cityMaxLength: ValidationError = {
  id: getID(),
  message: cityMaxLengthMessage,
  key: KEY_MAX_LENGTH,
};

export const cityMatchRequired: ValidationError = {
  id: getID(),
  message: cityMatchRequiredMessage,
  key: KEY_MATCH_REQUIRED,
};
