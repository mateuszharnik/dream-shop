import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentRefService } from '@services/document-ref.service';
import { SocialMediaService } from '@services/social-media.service';
import { SpinnerService } from '@services/spinner.service';
import { ButtonSaveText, ButtonSaveTitle } from '@models/buttons';
import { ValidationError } from '@models/errors';
import { SocialMedia } from '@models/index';
import { setAlerts } from '@helpers/alerts';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { SERVER_CONNECTION_ERROR } from '@helpers/constants/errors';
import { NOT_FOUND } from '@helpers/constants/status-codes';
import { SUCCESSFULLY_SAVED } from '@helpers/constants/success';
import { SOCIAL_MEDIA_ADMIN_PAGE } from '@helpers/constants/titles';
import { validation } from '@helpers/validation';
import {
  SAVE_TEXT,
  SAVE_TITLE,
  SAVING_TEXT,
  SAVING_TITLE,
} from '@helpers/constants/buttons';
import {
  facebookPattern,
  instagramPattern,
  linkedinPattern,
  twitterPattern,
} from '@helpers/errors/messages/social-media';
import {
  facebookValidators,
  instagramValidators,
  linkedinValidators,
  twitterValidators,
} from '@helpers/validation/social-media';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SocialMediaComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  socialMedia: SocialMedia = null;
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
  facebookValidationErrors: ValidationError[] = [facebookPattern];
  instagramValidationErrors: ValidationError[] = [instagramPattern];
  twitterValidationErrors: ValidationError[] = [twitterPattern];
  linkedinValidationErrors: ValidationError[] = [linkedinPattern];

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private documentRefService: DocumentRefService,
    private socialMediaService: SocialMediaService,
  ) {
    this.documentRefService.nativeDocument.title = SOCIAL_MEDIA_ADMIN_PAGE;

    this.validation = validation(this, 'SocialMediaComponent');
    this.setAlerts = setAlerts(this, 'SocialMediaComponent');
    this.setLoading = setLoading(this, 'SocialMediaComponent');
    this.startSubmittingForm = startSubmittingForm(
      this,
      'SocialMediaComponent',
    );

    this.addSocialMediaSubscription();
  }

  async ngOnInit() {
    try {
      this.socialMedia = await this.socialMediaService.fetchSocialMedia();
      this.socialMediaService.setSocialMedia(this.socialMedia);
    } catch (error) {
      this.onError(error);
    } finally {
      this.createForm(this.socialMedia);
      this.setLoading();
    }
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addSocialMediaSubscription() {
    this.subscriptions.push(
      this.socialMediaService
        .getSocialMedia()
        .subscribe((socialMedia: SocialMedia) => {
          this.socialMedia = socialMedia;
        }),
    );
  }

  removeSubscriptions() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  createForm(socialMedia: SocialMedia) {
    const {
      twitter = '',
      facebook = '',
      instagram = '',
      linkedin = '',
    } = socialMedia || {};

    this.form = this.formBuilder.group({
      twitter: [twitter, twitterValidators],
      facebook: [facebook, facebookValidators],
      linkedin: [linkedin, linkedinValidators],
      instagram: [instagram, instagramValidators],
    });
  }

  buttonTitle(condition = false): ButtonSaveTitle {
    return condition ? SAVING_TITLE : SAVE_TITLE;
  }

  buttonText(condition = false): ButtonSaveText {
    return condition ? SAVING_TEXT : SAVE_TEXT;
  }

  async saveSettings() {
    if (!this.startSubmittingForm()) {
      return;
    }

    try {
      this.socialMedia = await this.socialMediaService.saveSocialMedia(
        this.socialMedia._id,
        this.form.value,
      );

      this.socialMediaService.setSocialMedia(this.socialMedia);
      this.setAlerts({ successAlert: SUCCESSFULLY_SAVED });
    } catch (error) {
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
