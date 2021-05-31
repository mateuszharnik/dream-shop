import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AboutService } from '@services/about.service';
import { DocumentRefService } from '@services/document-ref.service';
import { SpinnerService } from '@services/spinner.service';
import { ValidationError } from '@models/errors';
import { ButtonSaveText, ButtonSaveTitle } from '@models/buttons';
import { About } from '@models/index';
import { setAlerts } from '@helpers/alerts';
import { validation } from '@helpers/validation';
import { informationValidators } from '@helpers/validation/about';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { serverErrorMessage } from '@helpers/variables/errors';
import { NOT_FOUND } from '@helpers/variables/constants/status-codes';
import { successfullySavedMessage } from '@helpers/variables/success';
import { aboutAdminPageTitle } from '@helpers/variables/titles';
import {
  saveText,
  saveTitle,
  savingText,
  savingTitle,
} from '@helpers/variables/buttons';
import {
  informationMaxLength,
  informationMinLength,
} from '@helpers/errors/messages/about';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  about: About = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
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
  informationValidationErrors: ValidationError[] = [
    informationMinLength,
    informationMaxLength,
  ];

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private aboutService: AboutService,
    private documentRefService: DocumentRefService,
  ) {
    this.documentRefService.nativeDocument.title = aboutAdminPageTitle;

    this.validation = validation(this, 'AboutComponent');
    this.setAlerts = setAlerts(this, 'AboutComponent');
    this.setLoading = setLoading(this, 'AboutComponent');
    this.startSubmittingForm = startSubmittingForm(this, 'AboutComponent');

    this.addAboutSubscription();
  }

  async ngOnInit() {
    try {
      this.about = await this.aboutService.fetchAbout();
      this.aboutService.setAbout(this.about);
    } catch (error) {
      this.onError(error);
    } finally {
      this.createForm(this.about);
      this.setLoading();
    }
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addAboutSubscription() {
    this.subscriptions.push(
      this.aboutService.getAbout().subscribe((about: About) => {
        this.about = about;
      }),
    );
  }

  removeSubscriptions() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  createForm(about: About) {
    const { information = '' } = about || {};

    this.form = this.formBuilder.group({
      information: [information, informationValidators],
    });
  }

  buttonTitle(condition = false): ButtonSaveTitle {
    return condition ? savingTitle : saveTitle;
  }

  buttonText(condition = false): ButtonSaveText {
    return condition ? savingText : saveText;
  }

  async saveSettings() {
    if (!this.startSubmittingForm()) {
      return;
    }

    try {
      this.about = await this.aboutService.saveAbout(
        this.about._id,
        this.form.value,
      );
      this.aboutService.setAbout(this.about);
      this.setAlerts({ successAlert: successfullySavedMessage });
    } catch (error) {
      this.onError(error);
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  onError(error) {
    if (!error.status || error.status === NOT_FOUND) {
      this.setAlerts({ serverErrorAlert: serverErrorMessage });
    } else {
      this.setAlerts({ errorAlert: error.error.message });
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
