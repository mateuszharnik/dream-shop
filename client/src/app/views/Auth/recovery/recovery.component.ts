import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { DocumentRefService } from '@services/document-ref.service';
import { SpinnerService } from '@services/spinner.service';
import Routes from '@models/routes';
import { ValidationError } from '@models/errors';
import {
  ButtonSendEmailIcon,
  ButtonSendEmailText,
  ButtonSendEmailTitle,
} from '@models/buttons';
import routes from '@helpers/constants/routes';
import { emailPattern, emailRequired } from '@helpers/errors/messages/auth';
import { emailValidators } from '@helpers/validation/auth';
import { NOT_FOUND } from '@helpers/constants/status-codes';
import { SERVER_CONNECTION_ERROR } from '@helpers/constants/errors';
import { validation } from '@helpers/validation';
import { HTTP } from '@helpers/constants/auth';
import { setAlerts } from '@helpers/alerts';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { RECOVERY_PAGE } from '@helpers/constants/titles';
import {
  PAPER_PLANE_ICON,
  SENDING_EMAIL_TEXT,
  SENDING_EMAIL_TITLE,
  SEND_EMAIL_TEXT,
  SEND_EMAIL_TITLE,
  SPINNER_ICON,
} from '@helpers/constants/buttons';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecoveryComponent implements OnInit {
  form: FormGroup = null;
  routes: Routes = routes;
  isLoading = true;
  isLink = false;
  isSubmitted = false;
  isDisabled = false;
  serverErrorAlert = '';
  errorAlert = '';
  successAlert = '';

  /* ====== Functions ====== */
  validation = null;
  setAlerts = null;
  setLoading = null;
  startSubmittingForm = null;

  /* ====== Validation Errors ====== */
  emailValidationErrors: ValidationError[] = [emailPattern, emailRequired];

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private documentRefService: DocumentRefService,
  ) {
    this.documentRefService.nativeDocument.title = RECOVERY_PAGE;

    this.validation = validation(this, 'RecoveryComponent');
    this.setAlerts = setAlerts(this, 'RecoveryComponent');
    this.setLoading = setLoading(this, 'RecoveryComponent');
    this.startSubmittingForm = startSubmittingForm(this, 'RecoveryComponent');

    this.isLoading = this.spinnerService.getLoadingValue();
  }

  ngOnInit() {
    this.createForm();
    this.setLoading();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', emailValidators],
    });
  }

  buttonTitle(condition = false): ButtonSendEmailTitle {
    return condition ? SENDING_EMAIL_TITLE : SEND_EMAIL_TITLE;
  }

  buttonText(condition = false): ButtonSendEmailText {
    return condition ? SENDING_EMAIL_TEXT : SEND_EMAIL_TEXT;
  }

  buttonIcon(condition = false): ButtonSendEmailIcon {
    return condition ? SPINNER_ICON : PAPER_PLANE_ICON;
  }

  async sendEmail() {
    if (!this.startSubmittingForm()) {
      return;
    }

    try {
      const response = await this.authService.sendRecoveryEmail(
        this.form.value,
      );

      this.isLink = response.message.includes(HTTP) ? true : false;

      this.setAlerts({ successAlert: response.message });
    } catch (error) {
      this.isLink = false;
      this.onError(error);
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  onError(error) {
    if (!error.status || error.status === NOT_FOUND) {
      this.setAlerts({ serverErrorAlert: SERVER_CONNECTION_ERROR });
    } else {
      this.setAlerts({ errorAlert: error.error.message });
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
