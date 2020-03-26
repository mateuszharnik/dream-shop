import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from '@models/index';
import { match, matchRequired } from '@helpers/index';

const userData: User = {
  name: 'Admin',
  username: 'admin',
  email: 'example@domain.com',
  image: '',
};

interface User {
  name: string;
  username: string;
  email: string;
  image: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  file: File = null;
  user: User = null;

  nameAlerts: Alert[] = [
    { id: '0', message: 'Imię jest za krótkie.', key: 'minlength' },
    { id: '1', message: 'Imię jest za długie.', key: 'maxlength' },
    { id: '2', message: 'Imię jest nieprawidłowe.', key: 'pattern' },
  ];
  emailAlerts: Alert[] = [
    { id: '0', message: 'Adres email jest wymagany.', key: 'required' },
    { id: '1', message: 'Adres email jest nieprawidłowy.', key: 'pattern' },
  ];
  passwordAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać obence hasło.', key: 'matchRequired' },
  ];
  newPasswordAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać nowe hasło.', key: 'matchRequired' },
    { id: '1', message: 'Hasło jest za krótkie', key: 'minlength' },
    { id: '2', message: 'Hasło jest za długie.', key: 'maxlength' },
  ];
  confirmNewPasswordAlerts: Alert[] = [
    { id: '0', message: 'Hasła nie są takie same.', key: 'match' },
  ];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.user = userData;
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm(this.user);
    }, 1000);
  }

  createForm(user: User) {
    this.form = this.formBuilder.group({
      email: [user.email, { validators: [
        // tslint:disable-next-line:max-line-length
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.required,
      ] }],
      name: [user.name, { validators: [
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]+$/),
      ] }],
      password: [''],
      newPassword: ['', { validators: [
        Validators.minLength(8),
        Validators.maxLength(50),
      ] }],
      confirmNewPassword: [''],
    },
      {validators: [
        matchRequired('newPassword', 'password'),
        matchRequired('password', 'newPassword'),
        match('newPassword', 'confirmNewPassword'),
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
    console.log(this.form.controls);
    console.log(this.file);
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  addFile(images: File[]) {
    if (images.length) {
      this.file = images[0];
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
