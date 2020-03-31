import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FAQs, Alert, FAQ } from '@models/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from '@services/spinner.service';
import { faqs } from '@helpers/fakeAPI';

const questionData = {
  id: '51',
  category: 'płatności',
  title: 'Basic 1',
  // tslint:disable-next-line: max-line-length
  content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto? Amet sunt aliquam beatae quis porro facer`,
};

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditFAQComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  categories: FAQs[] = [];
  question: FAQ = null;

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
      this.question = questionData;
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm(this.question);
    }, 1000);
  }

  createForm(question: FAQ) {
    this.form = this.formBuilder.group({
      question: [question.title, { validators: [
        Validators.pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-, \n.%@$!&\(\)+=?/]+$/),
        Validators.minLength(10),
        Validators.maxLength(1000),
        Validators.required,
      ]}],
      answer: [question.content, { validators: [
        Validators.pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-, \n.%@$!&\(\)+=?/]+$/),
        Validators.minLength(10),
        Validators.maxLength(5000),
        Validators.required,
      ]}],
      category: [null, { validators: [
        Validators.required,
      ]}],
    });

    this.formControls.category.setValue(this.question.category, { onlySelf: true });
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
