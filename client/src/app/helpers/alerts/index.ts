import { Alerts } from '@models/alerts';
import { checkRequiredProp, checkRequiredComponent } from '@helpers/validation';

export const setAlerts = (component, name = '') => {
  checkRequiredComponent(component, name);

  return (newAlerts: Alerts = {}) => {
    checkRequiredProp(component.serverErrorAlert, 'serverErrorAlert');
    checkRequiredProp(component.errorAlert, 'errorAlert');
    checkRequiredProp(component.successAlert, 'successAlert');

    const defaultAlerts: Alerts = {
      serverErrorAlert: '',
      errorAlert: '',
      successAlert: '',
    };

    const alerts: Alerts = Object.assign({}, defaultAlerts, newAlerts);

    component.serverErrorAlert = alerts.serverErrorAlert;
    component.errorAlert = alerts.errorAlert;
    component.successAlert = alerts.successAlert;
  };
};
