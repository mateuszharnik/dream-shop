export interface Alerts {
  serverErrorAlert?: string;
  errorAlert?: string;
  successAlert?: string;
}

export type AlertClassType = 'danger' | 'warning' | 'success';
