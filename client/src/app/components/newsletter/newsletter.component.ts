import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert, Alerts } from '@models/index';
import { NewsletterService } from '@services/newsletter.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsletterComponent implements OnInit {
  @Output() whenOpenModal: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;

  emailAlerts: Alert[] = [
    { id: '0', message: 'Email jest wymagany.', key: 'required' },
    { id: '1', message: 'Email jest nieprawidłowy.', key: 'pattern' },
  ];

  termsAlerts: Alert[] = [
    { id: '0', message: 'Musisz zaakceptować regulamin.', key: 'required' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private newsletterService: NewsletterService,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [
        '',
        {
          validators: [
            Validators.pattern(
              // tslint:disable-next-line:max-line-length
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ),
            Validators.required,
          ],
        },
      ],
      terms_accepted: [false, Validators.requiredTrue],
    });
  }

  openModal(event) {
    this.whenOpenModal.emit(event);
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  validation(prop: string): boolean {
    return (
      (this.formControls[prop].errors &&
        (this.formControls[prop].dirty || this.formControls[prop].touched)) ||
      (this.formControls[prop].errors && this.isSubmitted)
    );
  }

  toggleCheckbox() {
    this.form.patchValue({
      terms_accepted: !this.form.get('terms_accepted').value,
    });
  }

  computedButtonTitle(): 'Zapisz zmiany' | 'Zapisywanie zmian' {
    return this.isDisabled ? 'Zapisywanie zmian' : 'Zapisz zmiany';
  }

  computedButtonText(): 'Zapisz się' | 'Zapisywanie' {
    return this.isDisabled ? 'Zapisywanie' : 'Zapisz się';
  }

  computedButtonIcon():
    | 'fas fa-spinner fa-spin ml-1'
    | 'far fa-paper-plane ml-1' {
    return this.isDisabled
      ? 'fas fa-spinner fa-spin ml-1'
      : 'far fa-paper-plane ml-1';
  }

  async submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    try {
      const response = await this.newsletterService.saveEmail(this.form.value);
      this.setAlerts('', '', 'Pomyślnie zapisano adres email.');
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else if (error.status === 429) {
        this.setAlerts('', error.error);
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.form.reset();
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
