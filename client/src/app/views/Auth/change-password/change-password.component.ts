import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { DocumentRefService } from '@services/document-ref.service';
import { SpinnerService } from '@services/spinner.service';
import { UserService } from '@services/user.service';
import Routes from '@models/routes';
import { ValidationError } from '@models/errors';
import {
  ButtonChangePasswordText,
  ButtonChangePasswordTitle,
} from '@models/buttons';
import routes, { ADMIN } from '@helpers/constants/routes';
import { match } from '@helpers/index';
import { setToken } from '@helpers/token';
import { CONFIRM_PASSWORD, PASSWORD } from '@helpers/constants/auth';
import { SERVER_CONNECTION_ERROR } from '@helpers/constants/errors';
import { validation } from '@helpers/validation';
import { setAlerts } from '@helpers/alerts';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { CHANGE_PASSWORD_PAGE } from '@helpers/constants/titles';
import {
  CHANGE_PASSWORD_TEXT,
  CHANGE_PASSWORD_TITLE,
  CHANGING_PASSWORD_TEXT,
  CHANGING_PASSWORD_TITLE,
} from '@helpers/constants/buttons';
import {
  newPasswordConfirmValidators,
  newPasswordValidators,
} from '@helpers/validation/auth';
import {
  newPasswordConfirmMatch,
  newPasswordConfirmRequired,
  newPasswordMaxLength,
  newPasswordMinLength,
  newPasswordRequired,
} from '@helpers/errors/messages/auth';
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from '@helpers/constants/status-codes';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup = null;
  routes: Routes = routes;
  isLoading = true;
  isSubmitted = false;
  isDisabled = false;
  id = '';
  email = '';
  serverErrorAlert = '';
  errorAlert = '';
  successAlert = '';
  documentEl: Document = null;

  /* ====== Functions ====== */
  validation = null;
  setAlerts = null;
  setLoading = null;
  startSubmittingForm = null;

  /* ====== Validation Errors ====== */
  passwordValidationErrors: ValidationError[] = [
    newPasswordRequired,
    newPasswordMaxLength,
    newPasswordMinLength,
  ];
  confirmPasswordValidationErrors: ValidationError[] = [
    newPasswordConfirmRequired,
    newPasswordConfirmMatch,
  ];

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private userService: UserService,
    private documentRefService: DocumentRefService,
  ) {
    this.documentEl = this.documentRefService.nativeDocument;

    this.validation = validation(this, 'ChangePasswordComponent');
    this.setAlerts = setAlerts(this, 'ChangePasswordComponent');
    this.setLoading = setLoading(this, 'ChangePasswordComponent');
    this.startSubmittingForm = startSubmittingForm(
      this,
      'ChangePasswordComponent',
    );

    this.id = this.activateRoute.snapshot.params.id;
    this.isLoading = this.spinnerService.getLoadingValue();
  }

  async ngOnInit() {
    this.documentEl.title = CHANGE_PASSWORD_PAGE;

    try {
      const { email } = await this.authService.checkRecoveryToken(this.id);

      this.email = email;
    } catch (error) {
      this.onErrorInInit(error);
    } finally {
      this.createForm();
      this.setLoading();
    }
  }

  onErrorInInit(error) {
    if (error.status === NOT_FOUND) {
      this.router.navigate([routes.NOT_FOUND]);
      return;
    } else if (!error.status) {
      this.setAlerts({ serverErrorAlert: SERVER_CONNECTION_ERROR });
    } else if (error.status === INTERNAL_SERVER_ERROR) {
      this.setAlerts({ serverErrorAlert: error.error.message });
    } else {
      this.setAlerts({ errorAlert: error.error.message });
    }
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        password: ['', newPasswordValidators],
        confirm_password: ['', newPasswordConfirmValidators],
      },
      { validator: match(PASSWORD, CONFIRM_PASSWORD) },
    );
  }

  buttonTitle(condition = false): ButtonChangePasswordTitle {
    return condition ? CHANGING_PASSWORD_TITLE : CHANGE_PASSWORD_TITLE;
  }

  buttonText(condition = false): ButtonChangePasswordText {
    return condition ? CHANGING_PASSWORD_TEXT : CHANGE_PASSWORD_TEXT;
  }

  async changePassword() {
    if (!this.startSubmittingForm()) {
      return;
    }

    try {
      const { user, token = '' } = await this.authService.resetPassword(
        this.form.value,
        this.id,
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
