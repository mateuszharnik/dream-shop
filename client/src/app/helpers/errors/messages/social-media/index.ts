import { SOCIAL_MEDIA_PATTERN_NOT_CORRECT } from '@helpers/constants/social-media';
import { KEY_PATTERN } from '@helpers/constants/validation';
import { getID } from '@helpers/validation';
import { ValidationError } from '@models/errors';

/* ====== Twitter ====== */
export const twitterPattern: ValidationError = {
  id: getID(),
  message: SOCIAL_MEDIA_PATTERN_NOT_CORRECT,
  key: KEY_PATTERN,
};

/* ====== Facebook ====== */
export const facebookPattern: ValidationError = {
  id: getID(),
  message: SOCIAL_MEDIA_PATTERN_NOT_CORRECT,
  key: KEY_PATTERN,
};

/* ====== Instagram ====== */
export const instagramPattern: ValidationError = {
  id: getID(),
  message: SOCIAL_MEDIA_PATTERN_NOT_CORRECT,
  key: KEY_PATTERN,
};

/* ====== Linkedin ====== */
export const linkedinPattern: ValidationError = {
  id: getID(),
  message: SOCIAL_MEDIA_PATTERN_NOT_CORRECT,
  key: KEY_PATTERN,
};
