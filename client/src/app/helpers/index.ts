import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import DomPurify from 'dompurify';

export const purify = (text: string) => DomPurify.sanitize(text, {
  FORBID_TAGS: [
    'style',
    'script',
    'video',
    'audio',
    'iframe',
    'table',
    'input',
    'form',
    'textarea',
  ],
  FORBID_ATTR: [
    'style',
    'onerror',
    'onload',
  ],
});

export const trackID = (index: string, item: any): string => item.id;

export const checkRequiredProp = (prop: any, name: string) => {
  if (!prop) { throw new Error(`Property "${name}" is required.`); }
};

export const match = (prop: string, matchingProp: string) => (
  formGroup: FormGroup,
) => {
  const propControl: AbstractControl = formGroup.controls[prop];
  const matchingPropControl: AbstractControl = formGroup.controls[matchingProp];

  let result: ValidationErrors = null;

  if (matchingPropControl.errors && !matchingPropControl.errors.match) {
    return;
  }

  if (propControl.value !== matchingPropControl.value) {
    if (!matchingPropControl.touched) {
      matchingPropControl.markAsTouched();
    }

    result = { match: true };
  }

  matchingPropControl.setErrors(result);
};

export const matchRequired = (prop: string, matchingProp: string) => (
  formGroup: FormGroup,
) => {
  const propControl: AbstractControl = formGroup.controls[prop];
  const matchingPropControl: AbstractControl = formGroup.controls[matchingProp];

  let result: ValidationErrors = null;

  if (matchingPropControl.errors && !matchingPropControl.errors.matchRequired) {
    return;
  }

  if (propControl.value !== '' && matchingPropControl.value === '') {
    if (!matchingPropControl.touched) {
      matchingPropControl.markAsTouched();
    }

    result = { matchRequired: true };
  }

  matchingPropControl.setErrors(result);
};


export const matchValue = (prop: string, values: string[]) => (
  formGroup: FormGroup,
) => {
  const propControl: AbstractControl = formGroup.controls[prop];

  let result: ValidationErrors = null;

  if (propControl.errors && !propControl.errors.matchValue) {
    return;
  }

  values.some(value => {
    if (value.toLowerCase() === propControl.value.toLowerCase()) {
      result = { matchValue: true };
      return false;
    }
  });

  propControl.setErrors(result);
};
