import { Validators } from '@angular/forms';
import {
  emailRegExp,
  nipRegExp,
  phoneRegExp,
  streetNumberRegExp,
  workingHoursRegExp,
  zipCodeRegExp,
} from '@helpers/regexp';

/* ====== Email ====== */
export const emailValidators = {
  validators: [Validators.pattern(emailRegExp)],
};

/* ====== Phone ====== */
export const phoneValidators = {
  validators: [Validators.pattern(phoneRegExp)],
};

/* ====== Nip ====== */
export const nipValidators = {
  validators: [Validators.pattern(nipRegExp)],
};

/* ====== City ====== */
export const cityValidators = {
  validators: [Validators.minLength(2), Validators.maxLength(100)],
};

/* ====== Zip Code ====== */
export const zipCodeValidators = {
  validators: [Validators.pattern(zipCodeRegExp)],
};

/* ====== Street ====== */
export const streetValidators = {
  validators: [Validators.minLength(2), Validators.maxLength(100)],
};

/* ====== Street Number ====== */
export const streetNumberValidators = {
  validators: [Validators.pattern(streetNumberRegExp)],
};

/* ====== Working Hours ====== */
export const workingHoursValidators = {
  validators: [Validators.pattern(workingHoursRegExp)],
};
