import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { imageValidator, match, matchRequired } from '@helpers/index';
import { Alert, Alerts, User } from '@models/index';
import { SpinnerService } from '@services/spinner.service';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

declare global {
  interface Window { FileReader: FileReader; }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: any = null;

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
  user: User = null;

  nameAlerts: Alert[] = [
    { id: '0', message: 'Imię jest za krótkie.', key: 'minlength' },
    { id: '1', message: 'Imię jest za długie.', key: 'maxlength' },
    { id: '2', message: 'Imię jest nieprawidłowe.', key: 'pattern' },
  ];
  avatarAlerts: Alert[] = [
    { id: '0', message: 'Plik nie może przekraczać 5 MB.', key: 'maxsize' },
    { id: '1', message: 'Typ pliku jest niepoprawny.', key: 'type' },
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

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.subscriptions.push(this.userService.getUser().subscribe((data: User) => {
      this.user = data;
    }));
  }

  async ngOnInit() {
    try {
      const response: User = await this.userService.fetchUser(this.user._id);
      this.userService.setUser(response);
      this.createForm(this.user);
      this.setLoading();
    } catch (error) {
      if (error.status === 404) {
        this.router.navigate(['/404']);
        return;
      } else if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.createForm(this.user);
      this.setLoading();
    }
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
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
    const avatar = user && user.avatar ? user.avatar : '';
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
      confirm_new_password: ['', {
        validators: [
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      }],
      avatar: [avatar],
    },
      {
        validators: [
          matchRequired('new_password', 'password'),
          matchRequired('password', 'new_password'),
          match('new_password', 'confirm_new_password'),
          imageValidator('avatar'),
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

  deleteAvatar() {
    this.user.avatar = '';
    this.form.patchValue({
      avatar: '',
    });
    this.fileInput.nativeElement.value = '';
  }

  async submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    const formData: FormData = new FormData();

    formData.append('avatar', this.form.value.avatar);
    formData.append('name', this.form.value.name);
    formData.append('email', this.form.value.email);
    formData.append('password', this.form.value.password);
    formData.append('new_password', this.form.value.new_password);
    formData.append('username', this.form.value.username);
    formData.append('confirm_new_password', this.form.value.confirm_new_password);

    try {
      const response: User = await this.userService.updateUser(this.user._id, formData);
      this.userService.setUser(response);
      this.setAlerts('', '', 'Pomyślnie zaktualizowano.');
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

  addFile(event) {
    const images: File[] = event.target.files;

    if (!images.length) {
      return;
    }

    this.form.patchValue({
      avatar: images[0],
    });

    const imageTypeRegExp = /^image\/(png|jpg|jpeg)$/;

    if (window.FileReader && imageTypeRegExp.test(images[0].type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.avatar = reader.result;
      };
      reader.readAsDataURL(images[0]);
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
