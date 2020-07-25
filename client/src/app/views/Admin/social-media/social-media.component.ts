import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert, Alerts, SocialMedia } from '@models/index';
import { SocialMediaService } from '@services/social-media.service';
import { SpinnerService } from '@services/spinner.service';
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
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  subscriptions: Subscription[] = [];
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  trackID = null;

  facebookAlerts: Alert[] = [
    { id: '0', message: 'Adres jest nieprawidłowy (Upewnij się czy link zaczyna się od http://).', key: 'pattern' },
  ];
  instagramAlerts: Alert[] = [
    { id: '0', message: 'Adres jest nieprawidłowy (Upewnij się czy link zaczyna się od http://).', key: 'pattern' },
  ];
  twitterAlerts: Alert[] = [
    { id: '0', message: 'Adres jest nieprawidłowy (Upewnij się czy link zaczyna się od http://).', key: 'pattern' },
  ];
  linkedinAlerts: Alert[] = [
    { id: '0', message: 'Adres jest nieprawidłowy (Upewnij się czy link zaczyna się od http://).', key: 'pattern' },
  ];

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private socialMediaService: SocialMediaService,
    private router: Router,
  ) {
    this.subscriptions.push(this.socialMediaService.getSocialMedia().subscribe((data: SocialMedia) => {
      this.socialMedia = data;
    }));
  }

  async ngOnInit() {
    try {
      const response: SocialMedia = await this.socialMediaService.fetchSocialMedia();
      this.socialMediaService.setSocialMedia(response);
      this.createForm(this.socialMedia);
      this.setLoading();
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.createForm(this.socialMedia);
      this.setLoading();
    }
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  createForm(socialMedia: SocialMedia) {
    const twitter = socialMedia && socialMedia.twitter ? socialMedia.twitter : '';
    const facebook = socialMedia && socialMedia.facebook ? socialMedia.facebook : '';
    const instagram = socialMedia && socialMedia.instagram ? socialMedia.instagram : '';
    const linkedin = socialMedia && socialMedia.linkedin ? socialMedia.linkedin : '';

    this.form = this.formBuilder.group({
      twitter: [twitter, {
        validators: [
          Validators.pattern(/^https?:\/\/(www.)?twitter.com\/.+$/),
        ],
      }],
      facebook: [facebook, {
        validators: [
          Validators.pattern(/^https?:\/\/(www.)?facebook.com\/.+$/),
        ],
      }],
      linkedin: [linkedin, {
        validators: [
          Validators.pattern(/^https?:\/\/(www.)?linkedin.com\/.+$/),
        ],
      }],
      instagram: [instagram, {
        validators: [
          Validators.pattern(/^https?:\/\/(www.)?instagram.com\/.+$/),
        ],
      }],
    },
    );
  }

  validation(prop: string): boolean {
    return (
      this.formControls[prop].errors && (this.formControls[prop].dirty || this.formControls[prop].touched))
      || (this.formControls[prop].errors && this.isSubmitted
      );
  }

  computedButtonTitle(): 'Zapisz zmiany' | 'Zapisywanie zmian' {
    return this.isDisabled ? 'Zapisywanie zmian' : 'Zapisz zmiany';
  }

  computedButtonText(): 'Zapisz' | 'Zapisywanie' {
    return this.isDisabled ? 'Zapisywanie' : 'Zapisz';
  }

  async submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    try {
      const response: SocialMedia = await this.socialMediaService.saveSocialMedia(this.socialMedia._id, this.form.value);
      this.socialMediaService.setSocialMedia(response);
      this.setAlerts('', '', 'Pomyślnie zapisano.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
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
