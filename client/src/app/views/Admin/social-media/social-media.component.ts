import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialMediaLinks, Alert } from '@models/index';
import { socialMediaLinks as socialMediaLinksData } from '@helpers/fakeAPI';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SocialMediaComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  trackID = null;

  facebookAlerts: Alert[] = [
    { id: '0', message: 'Adres jest nieprawidłowy. Upewnij się czy link zaczyna się od http://', key: 'pattern' },
  ];
  instagramAlerts: Alert[] = [
    { id: '0', message: 'Adres jest nieprawidłowy. Upewnij się czy link zaczyna się od http://', key: 'pattern' },
  ];
  twitterAlerts: Alert[] = [
    { id: '0', message: 'Adres jest nieprawidłowy. Upewnij się czy link zaczyna się od http://', key: 'pattern' },
  ];
  linkedinAlerts: Alert[] = [
    { id: '0', message: 'Adres jest nieprawidłowy. Upewnij się czy link zaczyna się od http://', key: 'pattern' },
  ];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm(socialMediaLinksData);
    }, 1000);
  }

  createForm(socialMediaLinks: SocialMediaLinks) {
    this.form = this.formBuilder.group({
      twitter: [socialMediaLinks.twitter, { validators: [
        Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/),
      ] }],
      facebook: [socialMediaLinks.facebook, { validators: [
        Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/),
      ] }],
      linkedin: [socialMediaLinks.linkedin, { validators: [
        Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/),
      ] }],
      instagram: [socialMediaLinks.instagram, { validators: [
        Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/),
      ] }],
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

  submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
