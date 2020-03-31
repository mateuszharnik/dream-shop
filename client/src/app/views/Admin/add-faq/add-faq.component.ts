import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '@services/spinner.service';
import { Alert, FAQs } from '@models/index';
import { faqs } from '@helpers/fakeAPI';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddFAQComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  categories: FAQs[] = [];

  categoryAlerts: Alert[] = [
    { id: '0', message: 'Musisz wybrać kategorię.', key: 'required' },
  ];
  questionAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać pytanie.', key: 'required' },
    { id: '1', message: 'Pytanie zawiera niedozwolone znaki.', key: 'pattern' },
    { id: '2', message: 'Pytanie jest za krótkie.', key: 'minlength' },
    { id: '3', message: 'Pytanie jest za długie.', key: 'maxlength' },
  ];
  answerAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać odpowiedź.', key: 'required' },
    { id: '1', message: 'Odpowiedź zawiera niedozwolone znaki.', key: 'pattern' },
    { id: '2', message: 'Odpowiedź jest za krótka.', key: 'minlength' },
    { id: '3', message: 'Odpowiedź jest za długa.', key: 'maxlength' },
  ];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.categories = faqs;
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm();
    }, 1000);
  }

  createForm() {
    this.form = this.formBuilder.group({
      question: ['', { validators: [
        Validators.pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-,.%@$!&\(\)+=?/]+$/),
        Validators.minLength(10),
        Validators.maxLength(1000),
        Validators.required,
      ]}],
      answer: ['', { validators: [
        Validators.pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-,.%@$!&\(\)+=?/]+$/),
        Validators.minLength(10),
        Validators.maxLength(5000),
        Validators.required,
      ]}],
      category: [null, { validators: [
        Validators.required,
      ]}],
    });

    this.formControls.category.setValue(this.categories[0].category, { onlySelf: true });
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
