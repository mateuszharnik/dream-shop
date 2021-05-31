import { checkRequiredComponent, checkRequiredProp } from '@helpers/validation';

export const setLoading = (component, name = '') => {
  checkRequiredComponent(component, name);

  return (isLoading = false) => {
    checkRequiredProp(component.isLoading, 'isLoading');
    checkRequiredProp(component.spinnerService, 'spinnerService');

    component.isLoading = isLoading;

    setTimeout(() => {
      component.spinnerService.setLoading(isLoading);
    }, 50);
  };
};

export const startSubmittingForm = (component, name = '') => {
  checkRequiredComponent(component, name);

  return () => {
    checkRequiredProp(component.isSubmitted, 'isSubmitted');
    checkRequiredProp(component.form, 'form');
    checkRequiredProp(component.isDisabled, 'isDisabled');

    component.isSubmitted = true;

    if (component.form.invalid) {
      return false;
    }

    component.isDisabled = true;

    return true;
  };
};
