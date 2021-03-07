import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert, OrderContact } from '@models/index';
import { CartService } from '@services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartFormComponent implements OnInit, OnDestroy {
  @Output() prevStep: EventEmitter<any> = new EventEmitter<any>();
  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = null;
  contact: OrderContact = null;
  subscriptions: Subscription[] = [];

  nameAlerts: Alert[] = [
    { id: '0', message: 'Imię jest za długie.', key: 'maxlength' },
    { id: '1', message: 'Imię jest za krótkie.', key: 'minlength' },
    { id: '2', message: 'Musisz podać imię.', key: 'required' },
  ];

  surnameAlerts: Alert[] = [
    { id: '0', message: 'Nazwisko jest za długie.', key: 'maxlength' },
    { id: '1', message: 'Nazwisko jest za krótkie.', key: 'minlength' },
    { id: '2', message: 'Musisz podać nazwisko.', key: 'required' },
  ];

  emailAlerts: Alert[] = [
    { id: '0', message: 'Adres email jest wymagany.', key: 'required' },
    { id: '1', message: 'Adres email jest nieprawidłowy.', key: 'pattern' },
  ];

  phoneAlerts: Alert[] = [
    { id: '0', message: 'Numer telefonu jest wymagany.', key: 'required' },
    { id: '1', message: 'Numer telefonu jest nieprawidłowy.', key: 'pattern' },
  ];

  streetAlerts: Alert[] = [
    { id: '0', message: 'Nazwa ulicy jest za długa.', key: 'maxlength' },
    { id: '1', message: 'Nazwa ulicy jest za krótka.', key: 'minlength' },
    { id: '2', message: 'Nazwa ulicy jest wymagana.', key: 'required' },
  ];

  streetNumberAlerts: Alert[] = [
    { id: '0', message: 'Numer ulicy jest nieprawidłowy.', key: 'pattern' },
    { id: '1', message: 'Numer ulicy jest wymagany.', key: 'required' },
  ];

  cityAlerts: Alert[] = [
    { id: '0', message: 'Nazwa mista jest za długa.', key: 'maxlength' },
    { id: '1', message: 'Nazwa mista jest za krótka.', key: 'minlength' },
    { id: '2', message: 'Nazwa miasta jest wymagana.', key: 'required' },
  ];

  zipCodeAlerts: Alert[] = [
    { id: '0', message: 'Kod pocztowy jest nieprawidłowy.', key: 'pattern' },
    { id: '1', message: 'Kod pocztowy jest wymagany.', key: 'required' },
  ];

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.subscriptions.push(
      this.cartService.getContact().subscribe((contact: OrderContact) => {
        this.contact = contact;
      }),
    );
  }

  ngOnInit() {
    this.createForm(this.contact);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  createForm(contact: OrderContact) {
    const email: string = contact && contact.email ? contact.email : '';
    const phone: string = contact && contact.phone ? contact.phone : '';
    const name: string = contact && contact.name ? contact.name : '';
    const surname: string = contact && contact.surname ? contact.surname : '';
    const street: string = contact && contact.street ? contact.street : '';
    const streetNumber: string = contact && contact.street_number ? contact.street_number : '';
    const zipCode: string = contact && contact.zip_code ? contact.zip_code : '';
    const city: string = contact && contact.city ? contact.city : '';

    this.form = this.formBuilder.group({
      email: [
        email,
        {
          validators: [
            Validators.pattern(
              // tslint:disable-next-line:max-line-length
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ),
            Validators.required,
          ],
        },
      ],
      phone: [
        phone,
        {
          validators: [
            Validators.pattern(
              /^(\+[1-9]{1}([0-9]{1,})?\s)?[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/,
            ),
            Validators.required,
          ],
        },
      ],
      name: [
        name,
        {
          validators: [
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.required,
          ],
        },
      ],
      street: [
        street,
        {
          validators: [
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.required,
          ],
        },
      ],
      surname: [
        surname,
        {
          validators: [
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.required,
          ],
        },
      ],
      street_number: [
        streetNumber,
        {
          validators: [
            Validators.pattern(/^([1-9]([0-9]{1,})?)(\/[1-9]([0-9]{1,})?)?$/),
            Validators.required,
          ],
        },
      ],
      city: [
        city,
        {
          validators: [
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.required,
          ],
        },
      ],
      zip_code: [
        zipCode,
        {
          validators: [
            Validators.pattern(/^[0-9]{2}-[0-9]{3}$/),
            Validators.required,
          ],
        },
      ],
    });
  }

  validation(prop: string): boolean {
    return (
      (this.formControls[prop].errors &&
        (this.formControls[prop].dirty || this.formControls[prop].touched))
    );
  }

  onNextStep(event) {
    if (this.form.invalid) {
      return;
    }

    this.cartService.setContact(this.form.value);

    this.nextStep.emit(event);
  }

  onPrevStep(event) {
    this.prevStep.emit(event);
  }

  get formControls() {
    return this.form.controls;
  }
}
