import { ValidationError } from '@models/errors';
import { getID } from '@helpers/validation';
import {
  contentMaxLengthMessage,
  contentMinLengthMessage,
  contentRequiredMessage,
} from '@helpers/variables/regulations';
import {
  KEY_MAX_LENGTH,
  KEY_MIN_LENGTH,
  KEY_REQUIRED,
} from '@helpers/variables/constants/validation';

/* ====== Content ====== */
export const contentMaxLength: ValidationError = {
  id: getID(),
  message: contentMaxLengthMessage,
  key: KEY_MAX_LENGTH,
};

export const contentMinLength: ValidationError = {
  id: getID(),
  message: contentMinLengthMessage,
  key: KEY_MIN_LENGTH,
};

export const contentRequired: ValidationError = {
  id: getID(),
  message: contentRequiredMessage,
  key: KEY_REQUIRED,
};
