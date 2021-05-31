import { ValidationError } from '@models/errors';
import { getID } from '@helpers/validation';
import {
  informationMaxLengthMessage,
  informationMinLengthMessage,
} from '@helpers/variables/about';
import {
  KEY_MAX_LENGTH,
  KEY_MIN_LENGTH,
} from '@helpers/variables/constants/validation';

/* ====== Information ====== */
export const informationMinLength: ValidationError = {
  id: getID(),
  message: informationMinLengthMessage,
  key: KEY_MIN_LENGTH,
};

export const informationMaxLength: ValidationError = {
  id: getID(),
  message: informationMaxLengthMessage,
  key: KEY_MAX_LENGTH,
};
