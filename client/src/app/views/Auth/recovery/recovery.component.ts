import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert, Alerts } from '@models/index';
import { AuthService } from '@services/auth.service';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecoveryComponent implements OnInit {
  form: FormGroup = null;
  isSubmitted = false;
  isDisabled = false;
  isLoading = true;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  emailAlerts: Alert[] = [
    { id: '0', message: 'Adres email jest nieprawidłowy', key: 'pattern' },
    { id: '1', message: 'Proszę podać adres email', key: 'required' },
  ];

  constructor(private formBuilder: FormBuilder, private spinnerService: SpinnerService, private authService: AuthService) {
    this.isLoading = this.spinnerService.getLoadingValue();
  }

  ngOnInit() {
    this.createForm();
    setTimeout(() => {
      this.isLoading = false;
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', {
        validators: [
          // tslint:disable-next-line: max-line-length
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
          Validators.required,
        ],
      }],
    });
  }

  computedButtonTitle(): 'Wysyłanie wiadomości' | 'Wyślij wiadomość' {
    return this.isDisabled ? 'Wysyłanie wiadomości' : 'Wyślij wiadomość';
  }

  computedButtonText(): 'Wysyłanie' | 'Wyślij' {
    return this.isDisabled ? 'Wysyłanie' : 'Wyślij';
  }

  computedButtonIcon(): 'fas fa-spinner fa-spin ml-1' | 'far fa-paper-plane ml-1' {
    return this.isDisabled ? 'fas fa-spinner fa-spin ml-1' : 'far fa-paper-plane ml-1';
  }

  validation(prop: string): boolean {
    return (
      this.formControls[prop].errors && (this.formControls[prop].dirty || this.formControls[prop].touched))
      || (this.formControls[prop].errors && this.isSubmitted
      );
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  async submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    try {
      const response = await this.authService.sendRecoveryEmail(this.form.value);
      this.setAlerts('', '', response.message);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
