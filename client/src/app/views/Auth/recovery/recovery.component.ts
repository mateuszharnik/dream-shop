import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { DocumentRefService } from '@services/document-ref.service';
import { SpinnerService } from '@services/spinner.service';
import { ClientRoutes } from '@models/routes';
import { ValidationError } from '@models/errors';
import {
  ButtonSendEmailIcon,
  ButtonSendEmailText,
  ButtonSendEmailTitle,
} from '@models/buttons';
import { clientRoutes } from '@helpers/variables/routes';
import { emailPattern, emailRequired } from '@helpers/errors/messages/auth';
import { emailValidators } from '@helpers/validation/auth';
import { serverErrorMessage } from '@helpers/variables/errors';
import { validation } from '@helpers/validation';
import { HTTP } from '@helpers/variables/constants/auth';
import { setAlerts } from '@helpers/alerts';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { recoveryPageTitle } from '@helpers/variables/titles';
import {
  paperPlaneIcon,
  sendingEmailText,
  sendingEmailTitle,
  sendEmailText,
  sendEmailTitle,
  spinnerIcon,
} from '@helpers/variables/buttons';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecoveryComponent implements OnInit {
  form: FormGroup = null;
  routes: ClientRoutes = clientRoutes;
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
    this.documentRefService.nativeDocument.title = recoveryPageTitle;

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
    return condition ? sendingEmailTitle : sendEmailTitle;
  }

  buttonText(condition = false): ButtonSendEmailText {
    return condition ? sendingEmailText : sendEmailText;
  }

  buttonIcon(condition = false): ButtonSendEmailIcon {
    return condition ? spinnerIcon : paperPlaneIcon;
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
    if (!error.status) {
      this.setAlerts({ serverErrorAlert: serverErrorMessage });
    } else {
      this.setAlerts({ errorAlert: error.error.message });
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
