import { ValidationError } from '@models/errors';
import { KEY_PATTERN, KEY_REQUIRED } from '@helpers/variables/constants/validation';
import { getID } from '@helpers/validation';
import {
  latLngNotCorrectMessage,
  latLngRequiredMessage,
} from '@helpers/variables/map';

/* ====== Lat and Lng ====== */
export const latlngPattern: ValidationError = {
  id: getID(),
  message: latLngNotCorrectMessage,
  key: KEY_PATTERN,
};

export const latlngRequired: ValidationError = {
  id: getID(),
  message: latLngRequiredMessage,
  key: KEY_REQUIRED,
};
