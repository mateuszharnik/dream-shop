import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { match } from '@helpers/index';
import { setToken } from '@helpers/token';
import { Alert, Alerts, UserWithToken } from '@models/index';
import { AuthService } from '@services/auth.service';
import { SpinnerService } from '@services/spinner.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup = null;
  isSubmitted = false;
  isDisabled = false;
  isLoading = true;
  id: string = null;
  email: string = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  passwordAlerts: Alert[] = [
    { id: '0', message: 'Proszę podać nowe hasło', key: 'required' },
    { id: '1', message: 'Nowe hasło musi mieć minimum 8 znaków', key: 'minlength' },
    { id: '2', message: 'Nowe hasło nie może mieć więcej niż 50 znaków', key: 'maxlength' },
  ];

  confirmPasswordAlerts: Alert[] = [
    { id: '0', message: 'Proszę powtórzyć nowe hasło', key: 'required' },
    { id: '1', message: 'Hasła nie są takie same', key: 'match' },
  ];

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.isLoading = this.spinnerService.getLoadingValue();
  }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;

    try {
      const response = await this.authService.checkRecoveryToken(this.id);

      this.email = response.email;
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else if (error.status === 500) {
        this.setAlerts(error.error.message);
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isLoading = false;
      this.createForm();
      this.spinnerService.setLoading(this.isLoading);
    }
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  createForm() {
    this.form = this.formBuilder.group({
      password: ['', {
        validators: [
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.required,
        ],
      }],
      confirm_password: ['', {
        validators: [
          Validators.required,
        ],
      }],
    }, { validator: match('password', 'confirm_password') });
  }

  computedButtonTitle(): 'Zmień swoje hasło' | 'Zmiana hasła w toku' {
    return this.isDisabled ? 'Zmiana hasła w toku' : 'Zmień swoje hasło';
  }

  computedButtonText(): 'Zmień' | 'Zmienianie' {
    return this.isDisabled ? 'Zmienianie' : 'Zmień';
  }

  validation(prop: string): boolean {
    return (
      this.formControls[prop].errors && (this.formControls[prop].dirty || this.formControls[prop].touched))
      || (this.formControls[prop].errors && this.isSubmitted
      );
  }

  async submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    try {
      const response: UserWithToken = await this.authService.resetPassword(this.form.value, this.id);
      this.userService.setUser(response.user);
      setToken(response.token);
      this.router.navigate(['/admin']);
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
