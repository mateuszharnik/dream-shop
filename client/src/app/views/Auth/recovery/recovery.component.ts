import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from '@models/index';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecoveryComponent implements OnInit {
  emailAlerts: Alert[] = [
    { id: '0', message: 'Adres email jest nieprawidłowy', key: 'pattern' },
    { id: '1', message: 'Proszę podać adres email', key: 'required' },
  ];
  form: FormGroup = null;
  isSubmitted = false;
  isDisabled = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', { validators: [
        // tslint:disable-next-line: max-line-length
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.required,
      ]}],
    });
  }

  computedButtonTitle(): 'Wysyłanie wiadomości' | 'Wyślij wiadomość' {
    return this.isDisabled ? 'Wysyłanie wiadomości' : 'Wyślij wiadomość';
  }

  computedButtonText(): 'Wysyłanie' | 'Wyślij' {
    return this.isDisabled ? 'Wysyłanie' : 'Wyślij';
  }

  computedButtonIcon(): 'fas fa-spinner fa-spin' | 'far fa-paper-plane' {
    return this.isDisabled ? 'fas fa-spinner fa-spin' : 'far fa-paper-plane';
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

  get formControls() {
    return this.form.controls;
  }
}
