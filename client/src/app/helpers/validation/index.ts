import { customAlphabet } from 'nanoid';
import { nanoIDAlphabet, nanoIDLength } from '@helpers/variables/validation';

const nanoid = customAlphabet(nanoIDAlphabet, nanoIDLength);

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
