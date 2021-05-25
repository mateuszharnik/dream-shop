import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { DocumentRefService } from '@services/document-ref.service';
import { SpinnerService } from '@services/spinner.service';
import { UserService } from '@services/user.service';
import { ClientRoutes } from '@models/routes';
import { ValidationError } from '@models/errors';
import {
  ButtonChangePasswordText,
  ButtonChangePasswordTitle,
} from '@models/buttons';
import { clientRoutes } from '@helpers/variables/routes';
import { match } from '@helpers/index';
import { setToken } from '@helpers/token';
import { CONFIRM_PASSWORD, PASSWORD } from '@helpers/variables/constants/auth';
import { serverErrorMessage } from '@helpers/variables/errors';
import { validation } from '@helpers/validation';
import { setAlerts } from '@helpers/alerts';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { changePasswordPageTitle } from '@helpers/variables/titles';
import {
  changePasswordText,
  changePasswordTitle,
  changingPasswordText,
  changingPasswordTitle,
} from '@helpers/variables/buttons';
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
} from '@helpers/variables/constants/status-codes';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup = null;
  routes: ClientRoutes = clientRoutes;
  isLoading = true;
  isSubmitted = false;
  isDisabled = false;
  id = '';
  email = '';
  serverErrorAlert = '';
  errorAlert = '';
  successAlert = '';

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
    this.documentRefService.nativeDocument.title = changePasswordPageTitle;

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
    try {
      const { email } = await this.authService.checkRecoveryToken(this.id);

      this.email = email;
    } catch (error) {
      this.onErrorInit(error);
    } finally {
      this.createForm();
      this.setLoading();
    }
  }

  onErrorInit(error) {
    if (error.status === NOT_FOUND) {
      this.router.navigate([this.routes.notFound]);
      return;
    } else if (!error.status) {
      this.setAlerts({ serverErrorAlert: serverErrorMessage });
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
    return condition ? changingPasswordTitle : changePasswordTitle;
  }

  buttonText(condition = false): ButtonChangePasswordText {
    return condition ? changingPasswordText : changePasswordText;
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

      this.router.navigate([this.routes.admin]);
    } catch (error) {
      this.onError(error);
    }
  }

  onError(error) {
    if (!error.status) {
      this.setAlerts({ serverErrorAlert: serverErrorMessage });
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
