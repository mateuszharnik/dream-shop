import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Alert, Contact } from '@models/index';
import { matchRequired } from '@helpers/index';

const contactData: Contact = {
  id: '0',
  email: 'kontakt@dream.pl',
  phone: '+48 123 123 123',
  nip: '1234567890',
  adress: {
    street: 'Street',
    streetNumber: '7/21',
    city: 'City',
    code: '25-100',
  },
  workHours: '08:00 - 18:30',
};

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  trackID = null;

  emailAlerts: Alert[] = [
    { id: '0', message: 'Adres email jest wymagany', key: 'required' },
    { id: '1', message: 'Adres email jest nieprawidłowy.', key: 'pattern' },
  ];
  phoneAlerts: Alert[] = [
    { id: '0', message: 'Numer telefonu jest nieprawidłowy.', key: 'pattern' },
  ];
  nipAlerts: Alert[] = [
    { id: '0', message: 'Numer NIP jest nieprawidłowy.', key: 'pattern' },
  ];
  streetAlerts: Alert[] = [
    { id: '0', message: 'Nazwa ulicy jest za długa.', key: 'maxlength' },
    { id: '1', message: 'Nazwa ulicy jest za krótka.', key: 'minlength' },
    { id: '2', message: 'Nazwa ulicy jest wymagana.', key: 'matchRequired' },
  ];
  streetNumberAlerts: Alert[] = [
    { id: '0', message: 'Numer ulicy jest nieprawidłowy.', key: 'pattern' },
    { id: '1', message: 'Numer ulicy jest wymagany.', key: 'matchRequired' },
  ];
  cityAlerts: Alert[] = [
    { id: '0', message: 'Nazwa mista jest za długa.', key: 'maxlength' },
    { id: '1', message: 'Nazwa mista jest za krótka.', key: 'minlength' },
    { id: '2', message: 'Nazwa miasta jest wymagana.', key: 'matchRequired' },
  ];
  codeAlerts: Alert[] = [
    { id: '0', message: 'Kod pocztowy jest nieprawidłowy.', key: 'pattern' },
    { id: '1', message: 'Kod pocztowy jest wymagany.', key: 'matchRequired' },
  ];
  workHoursAlerts: Alert[] = [
    { id: '0', message: 'Godziny pracy są nieprawidłowe.', key: 'pattern' },
  ];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm(contactData);
    }, 1000);
  }

  createForm(contact: Contact) {
    this.form = this.formBuilder.group({
      email: [contact.email, { validators: [
        // tslint:disable-next-line:max-line-length
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.required,
      ] }],
      phone: [contact.phone, { validators: [
        Validators.pattern(/^(\+[1-9]{1}([0-9]{1,})?\s)?[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/),
      ] }],
      nip: [contact.nip, { validators: [
        Validators.pattern(/^[0-9]{10}$/),
      ] }],
      street: [contact.adress.street, { validators: [
        Validators.minLength(2),
        Validators.maxLength(100),
      ] }],
      streetNumber: [contact.adress.streetNumber, { validators: [
        Validators.pattern(/^([1-9]([0-9]{1,})?)(\/[1-9]([0-9]{1,})?)?$/),
      ] }],
      city: [contact.adress.city, { validators: [
        Validators.minLength(2),
        Validators.maxLength(100),
      ] }],
      code: [contact.adress.code, { validators: [
        Validators.pattern(/^[0-9]{2}-[0-9]{3}$/),
      ] }],
      workHours: [contact.workHours, { validators: [
        Validators.pattern(/^([0-1][0-9]|[2][0-4]):[0-5][0-9]\s-\s([0-1][0-9]|[2][0-4]):[0-5][0-9]$/),
      ] }],
    },
      {validators: [
        matchRequired('city', 'code'),
        matchRequired('code', 'city'),
        matchRequired('streetNumber', 'street'),
        matchRequired('street', 'streetNumber'),
      ]},
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
