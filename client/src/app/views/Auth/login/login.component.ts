import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { setToken } from '@helpers/token';
import { Alert, Alerts, UserWithToken } from '@models/index';
import { AlertsService } from '@services/alerts.service';
import { AuthService } from '@services/auth.service';
import { SpinnerService } from '@services/spinner.service';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  isSubmitted = false;
  isDisabled = false;
  isLoading = true;
  subscriptions: Subscription[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  usernameAlerts: Alert[] = [
    { id: '0', message: 'Nazwa użytkownika jest nieprawidłowa.', key: 'pattern' },
    { id: '1', message: 'Proszę podać nazwę użytkownika.', key: 'required' },
  ];

  passwordAlerts: Alert[] = [
    { id: '0', message: 'Proszę podać hasło.', key: 'required' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private alertsService: AlertsService,
  ) {
    this.subscriptions.push(this.alertsService.getAlert().subscribe((data: string) => {
      if (data === 'Sesja wygasła.') {
        this.setAlerts('', data);
      } else {
        this.setAlerts('', '', data);
      }
    }));

    this.isLoading = this.spinnerService.getLoadingValue();
  }

  ngOnInit() {
    this.createForm();
    setTimeout(() => {
      this.isLoading = false;
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  ngOnDestroy() {
    this.alertsService.setAlert('');
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', {
        validators: [
          // tslint:disable-next-line: max-line-length
          Validators.pattern(/^([^@]+|(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/),
          Validators.required,
        ],
      }],
      password: ['', {
        validators: [
          Validators.required,
        ],
      }],
    });
  }

  buttonTitle(value: boolean): 'Zaloguj się' | 'Logowanie' {
    return value ? 'Logowanie' : 'Zaloguj się';
  }

  buttonText(value: boolean): 'Zaloguj' | 'Logowanie' {
    return value ? 'Logowanie' : 'Zaloguj';
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
      const response: UserWithToken = await this.authService.login(this.form.value);
      this.userService.setUser(response.user);
      setToken(response.token);
      this.router.navigate(['/admin']);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
