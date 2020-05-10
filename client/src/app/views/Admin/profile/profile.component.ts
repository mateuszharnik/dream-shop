import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user as userData } from '@helpers/fakeAPI';
import { match, matchRequired } from '@helpers/index';
import { Alert, User, Alerts } from '@models/index';
import { SpinnerService } from '@services/spinner.service';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  subscriptions: Subscription[] = [];
  file: File = null;
  user: User = null;

  nameAlerts: Alert[] = [
    { id: '0', message: 'Imię jest za krótkie.', key: 'minlength' },
    { id: '1', message: 'Imię jest za długie.', key: 'maxlength' },
    { id: '2', message: 'Imię jest nieprawidłowe.', key: 'pattern' },
  ];
  usernameAlerts: Alert[] = [
    { id: '0', message: 'Nazwa użytkownika jest za krótka.', key: 'minlength' },
    { id: '1', message: 'Nazwa użytkownika jest za długa.', key: 'maxlength' },
    { id: '2', message: 'Nazwa użytkownika jest nieprawidłowa.', key: 'pattern' },
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

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder, private userService: UserService) {
    this.subscriptions.push(this.userService.getUser().subscribe((data: User) => {
      this.user = data;
    }));
  }

  async ngOnInit() {
    try {
      const response: User = await this.userService.fetchUser(this.user._id);
      this.userService.setUser(response);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isLoading = false;
      this.createForm(this.user);
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

  createForm(user: User) {
    const email = user && user.email ? user.email : '';
    const name = user && user.name ? user.name : '';
    const username = user && user.username ? user.username : '';

    this.form = this.formBuilder.group({
      email: [email, {
        validators: [
          // tslint:disable-next-line:max-line-length
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
          Validators.required,
        ],
      }],
      username: [username, {
        validators: [
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
      }],
      name: [name, {
        validators: [
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]+$/),
        ],
      }],
      password: [''],
      new_password: ['', {
        validators: [
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      }],
      confirm_new_password: [''],
    },
      {
        validators: [
          matchRequired('new_password', 'password'),
          matchRequired('password', 'new_password'),
          match('new_password', 'confirm_new_password'),
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

    const formData: FormData = new FormData();
    formData.append('avatar', this.file);
    formData.append('name', this.form.value.name);
    formData.append('email', this.form.value.email);
    formData.append('password', this.form.value.password);
    formData.append('new_password', this.form.value.new_password);
    formData.append('username', this.form.value.username);
    formData.append('confirm_new_password', this.form.value.confirm_new_password);

    try {
      const response: User = await this.userService.updateUser(this.user._id, formData);
      this.userService.setUser(response);
      this.setAlerts('', '', 'Pomyślnie zaktualozowano');
    } catch (error) {
      console.log(error);
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

  addFile(images: File[]) {
    if (images.length) {
      this.file = images[0];
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
