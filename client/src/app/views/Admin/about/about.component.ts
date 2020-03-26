import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { About, Alert } from '@models/index';
import { purify } from '@helpers/index';

const aboutData: About = {
  id: '0',
  text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
corrupti ipsam, voluptatibus est, veniam dignissimos adipisci atque
eum eligendi esse, voluptatem minima reiciendis temporibus delectus
perferendis id ducimus optio voluptate quam? Libero quaerat iure sunt
ex qui architecto officiis velit aliquam id quas dicta itaque
veritatis quos neque doloribus necessitatibus sequi aliquid, facilis
ipsum! Sapiente laborum eveniet fugit illum animi eligendi odio. Nam
quo voluptas consectetur dolorem enim alias, doloribus quisquam
excepturi fuga consequuntur natus quis mollitia. Rem laboriosam, vero
enim porro alias nam illum, similique omnis odio unde dolorem veniam?
Distinctio consequatur dolor nisi maxime esse repudiandae aliquid
modi!

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
inventore voluptatibus repellat fugiat recusandae temporibus dolore
sint vitae. Dolor consectetur molestias beatae quia ipsam quae illum,
non consequatur dolores libero. Nostrum voluptas dicta nam ipsam iusto
facilis alias laboriosam vitae, omnis, facere, odit maiores rem
molestiae. Dolor doloribus quae voluptatem.`,
};

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;

  informationAlerts: Alert[] = [
    { id: '0', message: 'To pole jest wymagane', key: 'required' },
    { id: '1', message: 'Liczba słów musi mieć więcej niż 10 znaków', key: 'minlength' },
    { id: '2', message: 'Liczba słów może mieć maksymalnie 5000 znaków', key: 'maxlength' },
  ];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm(aboutData);
    }, 1000);
  }

  createForm(about: About) {
    this.form = this.formBuilder.group({
      information: [about.text, { validators: [
        Validators.minLength(10),
        Validators.maxLength(5000),
        Validators.required,
      ] }],
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

  submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;
    console.dir(purify(this.form.controls.information.value));
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
