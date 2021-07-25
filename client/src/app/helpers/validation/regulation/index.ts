import { Validators } from '@angular/forms';
import {
  contentMinLength,
  contentMaxLength,
} from '@helpers/variables/regulations';

/* ====== Content ====== */
export const contentValidators = {
  validators: [
    Validators.minLength(contentMinLength),
    Validators.maxLength(contentMaxLength),
    Validators.required,
  ],
};
