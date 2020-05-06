import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Alert, Contact, Alerts } from '@models/index';
import { matchRequired } from '@helpers/index';
import { Subscription } from 'rxjs';
import { ContactService } from '@services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  contact: Contact = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  subscriptions: Subscription[] = [];
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
  zipCodeAlerts: Alert[] = [
    { id: '0', message: 'Kod pocztowy jest nieprawidłowy.', key: 'pattern' },
    { id: '1', message: 'Kod pocztowy jest wymagany.', key: 'matchRequired' },
  ];
  workingHoursAlerts: Alert[] = [
    { id: '0', message: 'Godziny pracy są nieprawidłowe.', key: 'pattern' },
  ];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder, private contactService: ContactService) {
    this.subscriptions.push(this.contactService.getContact().subscribe((data: Contact) => {
      this.contact = data;
    }));
  }

  async ngOnInit() {
    try {
      const response: Contact = await this.contactService.fetchContact();
      this.contactService.setContact(response);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isLoading = false;
      this.createForm(this.contact);
      this.toggleSpinner();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  createForm(contact: Contact) {
    const email = contact && contact.email ? contact.email : '';
    const phone = contact && contact.phone ? contact.phone : '';
    const nip = contact && contact.nip ? contact.nip : '';
    const workingHours = contact && contact.working_hours ? contact.working_hours : '';
    const street = contact && contact.address && contact.address.street ? contact.address.street : '';
    const streetNumber = contact && contact.address && contact.address.street_number ? contact.address.street_number : '';
    const zipCode = contact && contact.address && contact.address.zip_code ? contact.address.zip_code : '';
    const city = contact && contact.address && contact.address.city ? contact.address.city : '';

    this.form = this.formBuilder.group({
      email: [email, {
        validators: [
          // tslint:disable-next-line:max-line-length
          Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
          Validators.required,
        ],
      }],
      phone: [phone, {
        validators: [
          Validators.pattern(/^(\+[1-9]{1}([0-9]{1,})?\s)?[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/),
        ],
      }],
      nip: [nip, {
        validators: [
          Validators.pattern(/^[0-9]{10}$/),
        ],
      }],
      street: [street, {
        validators: [
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      }],
      street_number: [streetNumber, {
        validators: [
          Validators.pattern(/^([1-9]([0-9]{1,})?)(\/[1-9]([0-9]{1,})?)?$/),
        ],
      }],
      city: [city, {
        validators: [
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      }],
      zip_code: [zipCode, {
        validators: [
          Validators.pattern(/^[0-9]{2}-[0-9]{3}$/),
        ],
      }],
      working_hours: [workingHours, {
        validators: [
          Validators.pattern(/^([0-1][0-9]|[2][0-4]):[0-5][0-9]\s-\s([0-1][0-9]|[2][0-4]):[0-5][0-9]$/),
        ],
      }],
    },
      {
        validators: [
          matchRequired('city', 'zip_code'),
          matchRequired('zip_code', 'city'),
          matchRequired('street_number', 'street'),
          matchRequired('street', 'street_number'),
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
      const response: Contact = await this.contactService.saveContact(this.contact._id, this.form.value);
      this.contactService.setContact(response);
      this.setAlerts('', '', 'Pomyślnie zapisano');
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
    }
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
