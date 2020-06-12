import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { About, Alert, Alerts } from '@models/index';
import { AboutService } from '@services/about.service';
import { SpinnerService } from '@services/spinner.service';
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
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  subscriptions: Subscription[] = [];

  informationAlerts: Alert[] = [
    { id: '0', message: 'To pole jest wymagane.', key: 'required' },
    { id: '1', message: 'Liczba słów musi mieć więcej niż 10 znaków.', key: 'minlength' },
    { id: '2', message: 'Liczba słów może mieć maksymalnie 5000 znaków.', key: 'maxlength' },
  ];

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private aboutService: AboutService,
    private router: Router,
  ) {
    this.subscriptions.push(this.aboutService.getAbout().subscribe((data: About) => {
      this.about = data;
    }));
  }

  async ngOnInit() {
    try {
      const response: About = await this.aboutService.fetchAbout();
      this.aboutService.setAbout(response);
      this.createForm(this.about);
      this.setLoading();
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.createForm(this.about);
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

  createForm(about: About) {
    const information = about && about.information ? about.information : '';

    this.form = this.formBuilder.group({
      information: [information,
        {
          validators: [
            Validators.minLength(10),
            Validators.maxLength(5000),
            Validators.required,
          ],
        },
      ],
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
      const response: About = await this.aboutService.saveAbout(this.about._id, this.form.value);
      this.aboutService.setAbout(response);
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
