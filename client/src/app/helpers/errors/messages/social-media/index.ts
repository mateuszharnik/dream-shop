import { ValidationError } from '@models/errors';
import { socialMediaPatternNotCorrectMessage } from '@helpers/variables/social-media';
import { KEY_PATTERN } from '@helpers/variables/constants/validation';
import { getID } from '@helpers/validation';

/* ====== Twitter ====== */
export const twitterPattern: ValidationError = {
  id: getID(),
  message: socialMediaPatternNotCorrectMessage,
  key: KEY_PATTERN,
};

/* ====== Facebook ====== */
export const facebookPattern: ValidationError = {
  id: getID(),
  message: socialMediaPatternNotCorrectMessage,
  key: KEY_PATTERN,
};

/* ====== Instagram ====== */
export const instagramPattern: ValidationError = {
  id: getID(),
  message: socialMediaPatternNotCorrectMessage,
  key: KEY_PATTERN,
};

/* ====== Linkedin ====== */
export const linkedinPattern: ValidationError = {
  id: getID(),
  message: socialMediaPatternNotCorrectMessage,
  key: KEY_PATTERN,
};
