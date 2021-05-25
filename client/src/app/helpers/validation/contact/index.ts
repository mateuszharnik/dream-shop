import { Validators } from '@angular/forms';
import {
  cityMinLength,
  cityMaxLength,
  streetMaxLength,
  streetMinLength,
} from '@helpers/variables/contact';
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
  validators: [
    Validators.minLength(cityMinLength),
    Validators.maxLength(cityMaxLength),
  ],
};

/* ====== Zip Code ====== */
export const zipCodeValidators = {
  validators: [Validators.pattern(zipCodeRegExp)],
};

/* ====== Street ====== */
export const streetValidators = {
  validators: [
    Validators.minLength(streetMinLength),
    Validators.maxLength(streetMaxLength),
  ],
};

/* ====== Street Number ====== */
export const streetNumberValidators = {
  validators: [Validators.pattern(streetNumberRegExp)],
};

/* ====== Working Hours ====== */
export const workingHoursValidators = {
  validators: [Validators.pattern(workingHoursRegExp)],
};
