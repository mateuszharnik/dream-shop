import { Validators } from '@angular/forms';
import { mapRegExp } from '@helpers/regexp';

/* ====== Lat and Lng ====== */
export const latlngValidators = {
  validators: [Validators.pattern(mapRegExp)],
};
