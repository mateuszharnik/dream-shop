import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '@services/alerts.service';
import { AuthService } from '@services/auth.service';
import { SpinnerService } from '@services/spinner.service';
import { DocumentRefService } from '@services/document-ref.service';
import { UserService } from '@services/user.service';
import Routes from '@models/routes';
import { ValidationError } from '@models/errors';
import { ButtonLogInText, ButtonLogInTitle } from '@models/buttons';
import routes, { ADMIN } from '@helpers/constants/routes';
import { NOT_FOUND } from '@helpers/constants/status-codes';
import { setToken } from '@helpers/token';
import { validation } from '@helpers/validation';
import { setAlerts } from '@helpers/alerts';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { LOGIN_PAGE } from '@helpers/constants/titles';
import {
  passwordRequired,
  usernamePattern,
  usernameRequired,
} from '@helpers/errors/messages/auth';
import {
  passwordValidators,
  usernameValidators,
} from '@helpers/validation/auth';
import {
  SERVER_CONNECTION_ERROR,
  SESSION_EXPIRED,
} from '@helpers/constants/errors';
import {
  LOGGING_IN,
  LOG_IN_TEXT,
  LOG_IN_TITLE,
} from '@helpers/constants/buttons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  routes: Routes = routes;
  isLoading = true;
  isSubmitted = false;
  isDisabled = false;
  serverErrorAlert = '';
  errorAlert = '';
  successAlert = '';
  subscriptions: Subscription[] = [];

  /* ====== Functions ====== */
  validation = null;
  setAlerts = null;
  setLoading = null;
  startSubmittingForm = null;

  /* ====== Validation Errors ====== */
  passwordValidationErrors: ValidationError[] = [passwordRequired];
  usernameValidationErrors: ValidationError[] = [
    usernamePattern,
    usernameRequired,
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private alertsService: AlertsService,
    private documentRefService: DocumentRefService,
  ) {
    this.documentRefService.nativeDocument.title = LOGIN_PAGE;

    this.validation = validation(this, 'LoginComponent');
    this.setAlerts = setAlerts(this, 'LoginComponent');
    this.setLoading = setLoading(this, 'LoginComponent');
    this.startSubmittingForm = startSubmittingForm(this, 'LoginComponent');

    this.addAlertSubscription();

    this.isLoading = this.spinnerService.getLoadingValue();
  }

  ngOnInit() {
    this.createForm();
    this.setLoading();
  }

  ngOnDestroy() {
    this.alertsService.setAlert('');
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  addAlertSubscription() {
    this.subscriptions.push(
      this.alertsService.getAlert().subscribe((alert: string) => {
        if (alert === SESSION_EXPIRED) {
          this.setAlerts({ errorAlert: alert });
        } else {
          this.setAlerts({ successAlert: alert });
        }
      }),
    );
  }

  buttonTitle(condition = false): ButtonLogInTitle {
    return condition ? LOGGING_IN : LOG_IN_TITLE;
  }

  buttonText(condition = false): ButtonLogInText {
    return condition ? LOGGING_IN : LOG_IN_TEXT;
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', usernameValidators],
      password: ['', passwordValidators],
    });
  }

  async logIn() {
    if (!this.startSubmittingForm()) {
      return;
    }

    try {
      const { user, token = '' } = await this.authService.login(
        this.form.value,
      );

      this.userService.setUser(user);
      setToken(token);

      this.router.navigate([ADMIN]);
    } catch (error) {
      this.onError(error);
    }
  }

  onError(error) {
    if (!error.status || error.status === NOT_FOUND) {
      this.setAlerts({ serverErrorAlert: SERVER_CONNECTION_ERROR });
    } else {
      this.setAlerts({ errorAlert: error.error.message });
    }

    this.isDisabled = false;
    this.isSubmitted = false;
  }

  get formControls() {
    return this.form.controls;
  }
}
