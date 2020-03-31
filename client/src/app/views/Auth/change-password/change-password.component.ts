import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { match } from '@helpers/index';
import { Alert } from '@models/index';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup = null;
  isSubmitted = false;
  isDisabled = false;
  isLoading = true;

  passwordAlerts: Alert[] = [
    { id: '0', message: 'Proszę podać nowe hasło', key: 'required' },
    { id: '1', message: 'Nowe hasło musi mieć minimum 8 znaków', key: 'minlength' },
    { id: '2', message: 'Nowe hasło nie może mieć więcej niż 50 znaków', key: 'maxlength' },
  ];
  
  confirmPasswordAlerts: Alert[] = [
    { id: '0', message: 'Proszę powtórzyć nowe hasło', key: 'required' },
    { id: '1', message: 'Hasła nie są takie same', key: 'match' },
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
      password: ['', { validators: [
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.required,
      ]}],
      confirmPassword: ['', { validators: [
        Validators.required,
      ]}],
    }, { validator: match('password', 'confirmPassword') });
  }

  computedButtonTitle(): 'Zmień swoje hasło' | 'Zmiana hasła w toku' {
    return this.isDisabled ? 'Zmiana hasła w toku' : 'Zmień swoje hasło';
  }

  computedButtonText(): 'Zmień' | 'Zmienianie' {
    return this.isDisabled ? 'Zmienianie' : 'Zmień';
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
