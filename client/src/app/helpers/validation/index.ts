import { NANOID_ALPHABET } from '@helpers/constants/validation';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(NANOID_ALPHABET, 10);

export const getID = (): string => nanoid();

export const checkRequiredProp = (prop: any, name: string) => {
  if (prop === undefined) {
    throw new Error(`Property "${name}" is required.`);
  }
};

export const checkRequiredComponent = (component, name = '') => {
  if (typeof component !== 'object' || component === null) {
    throw new Error(`Component "${name}" is required.`);
  }
};

export const validation = (component, name = '') => {
  checkRequiredComponent(component, name);

  return (prop: string): boolean => {
    checkRequiredProp(component.formControls, 'formControls');
    checkRequiredProp(component.isSubmitted, 'isSubmitted');

    return (
      (component.formControls[prop].errors &&
        (component.formControls[prop].dirty ||
          component.formControls[prop].touched)) ||
      (component.formControls[prop].errors && component.isSubmitted)
    );
  };
};
