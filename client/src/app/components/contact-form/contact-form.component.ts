import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trackID } from '@helpers/index';
import { Alert, Alerts, Message } from '@models/index';
import { MessageService } from '@services/message.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactFormComponent implements OnInit {
  @Output() whenOpenModal: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isDisabled = false;
  isSubmitted = false;
  trackID = null;

  nameAlerts: Alert[] = [
    { id: '0', message: 'Imię jest wymagane.', key: 'required' },
    {
      id: '1',
      message: `Imię nie może zawierać cyfr, znaków specjalnych
     i może składać się maksymalnie z 2 części np. Jan Kowalski.`,
      key: 'pattern',
    },
    { id: '2', message: 'Imię musi mieć minimum 3 znaki.', key: 'minlength' },
    {
      id: '3',
      message: 'Imię nie może przekraczać 50 znaków.',
      key: 'maxlength',
    },
  ];
  emailAlerts: Alert[] = [
    { id: '0', message: 'Adres email jest nieprawidłowy.', key: 'pattern' },
    { id: '1', message: 'Proszę podać adres email.', key: 'required' },
  ];
  subjectAlerts: Alert[] = [
    { id: '0', message: 'Temat jest wymagany.', key: 'required' },
    { id: '1', message: 'Temat musi mieć minimum 3 znaki.', key: 'minlength' },
    {
      id: '2',
      message: 'Temat nie może przekraczać 150 znaków.',
      key: 'maxlength',
    },
  ];
  messageAlerts: Alert[] = [
    { id: '0', message: 'Treść wiadomości jest wymagana.', key: 'required' },
    {
      id: '1',
      message: 'Treść wiadomości musi mieć minimum 3 znaki.',
      key: 'minlength',
    },
    {
      id: '2',
      message: 'Treść wiadomości nie może przekraczać 2000 znaków.',
      key: 'maxlength',
    },
  ];
  termsAlerts: Alert[] = [
    { id: '0', message: 'Musisz zaakceptować regulamin.', key: 'required' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.trackID = trackID;

    this.form = this.formBuilder.group({
      name: [
        '',
        {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(
              /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]+[ ]?[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]*$/,
            ),
            Validators.required,
          ],
        },
      ],
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
      subject: [
        '',
        {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(150),
            Validators.required,
          ],
        },
      ],
      message: [
        '',
        {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(2000),
            Validators.required,
          ],
        },
      ],
      terms_accepted: [false, Validators.requiredTrue],
    });
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

  computedButtonTitle(): 'Wysyłanie wiadomości' | 'Wyślij wiadomość' {
    return this.isDisabled ? 'Wysyłanie wiadomości' : 'Wyślij wiadomość';
  }

  openModal(event) {
    this.whenOpenModal.emit(event);
  }

  computedButtonText(): 'Wysyłanie' | 'Wyślij' {
    return this.isDisabled ? 'Wysyłanie' : 'Wyślij';
  }

  computedButtonIcon():
    | 'fas fa-spinner fa-spin ml-1'
    | 'far fa-paper-plane ml-1' {
    return this.isDisabled
      ? 'fas fa-spinner fa-spin ml-1'
      : 'far fa-paper-plane ml-1';
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  async submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    try {
      const response: Message = await this.messageService.saveMessage(
        this.form.value,
      );
      this.setAlerts('', '', 'Pomyślnie zapisano.');
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
