import { ValidationError } from '@models/errors';
import { KEY_PATTERN } from '@helpers/variables/constants/validation';
import { getID } from '@helpers/validation';
import { latLngNotCorrectMessage } from '@helpers/variables/map';

/* ====== Lat and Lng ====== */
export const latlngPattern: ValidationError = {
  id: getID(),
  message: latLngNotCorrectMessage,
  key: KEY_PATTERN,
};
