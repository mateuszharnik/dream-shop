import { Validators } from '@angular/forms';
import {
  facebookRegExp,
  instagramRegExp,
  linkedinRegExp,
  twitterRegExp,
} from '@helpers/regexp';

/* ====== Twitter ====== */
export const twitterValidators = {
  validators: [Validators.pattern(twitterRegExp)],
};

/* ====== Instagram ====== */
export const instagramValidators = {
  validators: [Validators.pattern(instagramRegExp)],
};

/* ====== Linkedin ====== */
export const linkedinValidators = {
  validators: [Validators.pattern(linkedinRegExp)],
};

/* ====== Facebook ====== */
export const facebookValidators = {
  validators: [Validators.pattern(facebookRegExp)],
};
