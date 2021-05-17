import { EMAIL_NOT_CORRECT } from '@helpers/constants/auth';
import {
  CITY_MATCH_REQUIRED,
  CITY_MAX_LENGTH,
  CITY_MIN_LENGTH,
  NIP_NOT_CORRECT,
  PHONE_NOT_CORRECT,
  STREET_MATCH_REQUIRED,
  STREET_MAX_LENGTH,
  STREET_MIN_LENGTH,
  STREET_NUMBER_MATCH_REQUIRED,
  STREET_NUMBER_NOT_CORRECT,
  WORKING_HOURS_NOT_CORRECT,
  ZIP_CODE_MATCH_REQUIRED,
  ZIP_CODE_NOT_CORRECT,
} from '@helpers/constants/contact';
import {
  KEY_MATCH_REQUIRED,
  KEY_MAX_LENGTH,
  KEY_MIN_LENGTH,
  KEY_PATTERN,
} from '@helpers/constants/validation';
import { getID } from '@helpers/validation';
import { ValidationError } from '@models/errors';

/* ====== Email ====== */
export const emailPattern: ValidationError = {
  id: getID(),
  message: EMAIL_NOT_CORRECT,
  key: KEY_PATTERN,
};

/* ====== Phone ====== */
export const phonePattern: ValidationError = {
  id: getID(),
  message: PHONE_NOT_CORRECT,
  key: KEY_PATTERN,
};

/* ====== Nip ====== */
export const nipPattern: ValidationError = {
  id: getID(),
  message: NIP_NOT_CORRECT,
  key: KEY_PATTERN,
};

/* ====== Street ====== */
export const streetMaxLength: ValidationError = {
  id: getID(),
  message: STREET_MAX_LENGTH,
  key: KEY_MAX_LENGTH,
};

export const streetMinLength: ValidationError = {
  id: getID(),
  message: STREET_MIN_LENGTH,
  key: KEY_MIN_LENGTH,
};

export const streetMatchRequired: ValidationError = {
  id: getID(),
  message: STREET_MATCH_REQUIRED,
  key: KEY_MATCH_REQUIRED,
};

/* ====== Street Number ====== */
export const streetNumberPattern: ValidationError = {
  id: getID(),
  message: STREET_NUMBER_NOT_CORRECT,
  key: KEY_PATTERN,
};

export const streetNumberMatchRequired: ValidationError = {
  id: getID(),
  message: STREET_NUMBER_MATCH_REQUIRED,
  key: KEY_MATCH_REQUIRED,
};

/* ====== Working Hours ====== */
export const workingHoursPattern: ValidationError = {
  id: getID(),
  message: WORKING_HOURS_NOT_CORRECT,
  key: KEY_PATTERN,
};

/* ====== Zip Code ====== */
export const zipCodePattern: ValidationError = {
  id: getID(),
  message: ZIP_CODE_NOT_CORRECT,
  key: KEY_PATTERN,
};

export const zipCodeMatchRequired: ValidationError = {
  id: getID(),
  message: ZIP_CODE_MATCH_REQUIRED,
  key: KEY_MATCH_REQUIRED,
};

/* ====== City ====== */
export const cityMinLength: ValidationError = {
  id: getID(),
  message: CITY_MIN_LENGTH,
  key: KEY_MIN_LENGTH,
};

export const cityMaxLength: ValidationError = {
  id: getID(),
  message: CITY_MAX_LENGTH,
  key: KEY_MAX_LENGTH,
};

export const cityMatchRequired: ValidationError = {
  id: getID(),
  message: CITY_MATCH_REQUIRED,
  key: KEY_MATCH_REQUIRED,
};
