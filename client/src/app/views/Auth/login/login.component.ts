import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from '@models/index';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup = null;
  isSubmitted = false;
  isDisabled = false;
  isLoading = true;

  usernameAlerts: Alert[] = [
    { id: '0', message: 'Nazwa użytkownika jest nieprawidłowa', key: 'pattern' },
    { id: '1', message: 'Proszę podać nazwę użytkownika', key: 'required' },
  ];

  passwordAlerts: Alert[] = [
    { id: '0', message: 'Proszę podać hasło', key: 'required' },
  ];

  constructor(private formBuilder: FormBuilder, private router: Router, private spinnerService: SpinnerService) {
    this.isLoading = this.spinnerService.getLoadingValue();
  }

  ngOnInit() {
    this.createForm();
    setTimeout(() => {
      this.isLoading = false;
      this.toggleSpinner();
    }, 0);
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', { validators: [
        // tslint:disable-next-line: max-line-length
        Validators.pattern(/^([^@]+|(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/),
        Validators.required,
      ]}],
      password: ['', { validators: [
        Validators.required,
      ]}],
    });
  }

  computedButtonTitle(): 'Zaloguj się' | 'Logowanie' {
    return this.isDisabled ? 'Logowanie' : 'Zaloguj się';
  }

  computedButtonText(): 'Zaloguj' | 'Logowanie' {
    return this.isDisabled ? 'Logowanie' : 'Zaloguj';
  }

  validation(prop: string): boolean {
    return (
      this.formControls[prop].errors && (this.formControls[prop].dirty || this.formControls[prop].touched))
      || (this.formControls[prop].errors && this.isSubmitted
    );
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
