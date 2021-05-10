import { Validators } from '@angular/forms';
import { emailRegExp, usernameRegExp } from '@helpers/regexp';

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
    Validators.minLength(8),
    Validators.maxLength(50),
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
