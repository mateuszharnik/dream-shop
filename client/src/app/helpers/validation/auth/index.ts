import { Validators } from '@angular/forms';
import { emailRegExp, usernameRegExp } from '@helpers/regexp';
import {
  newPasswordMinLength,
  newPasswordMaxLength,
} from '@helpers/variables/auth';

/* ====== Username ====== */
export const usernameValidators = {
  validators: [Validators.pattern(usernameRegExp), Validators.required],
};

/* ====== Password ====== */
export const passwordValidators = {
  validators: [Validators.required],
};

/* ====== New Password ====== */
export const newPasswordValidators = {
  validators: [
    Validators.minLength(newPasswordMinLength),
    Validators.maxLength(newPasswordMaxLength),
    Validators.required,
  ],
};

/* ====== Confirm Password ====== */
export const newPasswordConfirmValidators = {
  validators: [Validators.required],
};

/* ====== Email ====== */
export const emailValidators = {
  validators: [Validators.pattern(emailRegExp), Validators.required],
};
