import { Validators } from '@angular/forms';
import {
  informationMinLength,
  informationMaxLength,
} from '@helpers/variables/about';

/* ====== Information ====== */
export const informationValidators = {
  validators: [
    Validators.minLength(informationMinLength),
    Validators.maxLength(informationMaxLength),
  ],
};
