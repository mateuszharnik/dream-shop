import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '@services/contact.service';
import { DocumentRefService } from '@services/document-ref.service';
import { SpinnerService } from '@services/spinner.service';
import { ButtonSaveText, ButtonSaveTitle } from '@models/buttons';
import { ValidationError } from '@models/errors';
import { Contact } from '@models/index';
import { setAlerts } from '@helpers/alerts';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { SERVER_CONNECTION_ERROR } from '@helpers/constants/errors';
import { NOT_FOUND } from '@helpers/constants/status-codes';
import { SUCCESSFULLY_SAVED } from '@helpers/constants/success';
import { CONTACT_ADMIN_PAGE } from '@helpers/constants/titles';
import { matchRequired } from '@helpers/index';
import { validation } from '@helpers/validation';
import {
  CITY,
  STREET,
  STREET_NUMBER,
  ZIP_CODE,
} from '@helpers/constants/contact';
import {
  SAVE_TEXT,
  SAVE_TITLE,
  SAVING_TEXT,
  SAVING_TITLE,
} from '@helpers/constants/buttons';
import {
  cityMatchRequired,
  cityMaxLength,
  cityMinLength,
  emailPattern,
  nipPattern,
  phonePattern,
  streetMatchRequired,
  streetMaxLength,
  streetMinLength,
  streetNumberMatchRequired,
  streetNumberPattern,
  workingHoursPattern,
  zipCodeMatchRequired,
  zipCodePattern,
} from '@helpers/errors/messages/contact';
import {
  cityValidators,
  emailValidators,
  nipValidators,
  phoneValidators,
  streetNumberValidators,
  streetValidators,
  workingHoursValidators,
  zipCodeValidators,
} from '@helpers/validation/contact';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  contact: Contact = null;
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
  emailValidationErrors: ValidationError[] = [emailPattern];
  phoneValidationErrors: ValidationError[] = [phonePattern];
  nipValidationErrors: ValidationError[] = [nipPattern];
  workingHoursValidationErrors: ValidationError[] = [workingHoursPattern];
  streetValidationErrors: ValidationError[] = [
    streetMinLength,
    streetMaxLength,
    streetMatchRequired,
  ];
  streetNumberValidationErrors: ValidationError[] = [
    streetNumberPattern,
    streetNumberMatchRequired,
  ];
  cityValidationErrors: ValidationError[] = [
    cityMaxLength,
    cityMinLength,
    cityMatchRequired,
  ];
  zipCodeValidationErrors: ValidationError[] = [
    zipCodePattern,
    zipCodeMatchRequired,
  ];

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private documentRefService: DocumentRefService,
    private contactService: ContactService,
  ) {
    this.documentRefService.nativeDocument.title = CONTACT_ADMIN_PAGE;

    this.validation = validation(this, 'ContactComponent');
    this.setAlerts = setAlerts(this, 'ContactComponent');
    this.setLoading = setLoading(this, 'ContactComponent');
    this.startSubmittingForm = startSubmittingForm(this, 'ContactComponent');

    this.addContactSubscription();
  }

  async ngOnInit() {
    try {
      this.contact = await this.contactService.fetchContact();
      this.contactService.setContact(this.contact);
    } catch (error) {
      this.onError(error);
    } finally {
      this.createForm(this.contact);
      this.setLoading();
    }
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addContactSubscription() {
    this.subscriptions.push(
      this.contactService.getContact().subscribe((contact: Contact) => {
        this.contact = contact;
      }),
    );
  }

  removeSubscriptions() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  createForm(contact: Contact) {
    const {
      email = '',
      phone = '',
      nip = '',
      zip_code = '',
      city = '',
      working_hours = '',
      street = '',
      street_number = '',
    } = contact || {};

    this.form = this.formBuilder.group(
      {
        email: [email, emailValidators],
        phone: [phone, phoneValidators],
        nip: [nip, nipValidators],
        street: [street, streetValidators],
        street_number: [street_number, streetNumberValidators],
        city: [city, cityValidators],
        zip_code: [zip_code, zipCodeValidators],
        working_hours: [working_hours, workingHoursValidators],
      },
      {
        validators: [
          matchRequired(CITY, ZIP_CODE),
          matchRequired(ZIP_CODE, CITY),
          matchRequired(STREET_NUMBER, STREET),
          matchRequired(STREET, STREET_NUMBER),
        ],
      },
    );
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
      this.contact = await this.contactService.saveContact(
        this.contact._id,
        this.form.value,
      );
      this.contactService.setContact(this.contact);
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
