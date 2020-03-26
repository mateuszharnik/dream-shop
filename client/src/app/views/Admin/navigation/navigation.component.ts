import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Alert } from '@models/index';
import { SpinnerService } from '@services/spinner.service';
import { matchValue } from '@helpers/index';

const data = {
  categories: [
    {
      id: '0',
      category: 'Lakiery do paznokci',
    },
    {
      id: '1',
      category: 'Szampony',
    },
    {
      id: '2',
      category: 'Akcesoria',
    },
  ],
};

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  categories = null;

  categoryAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać kategorie.', key: 'required' },
    { id: '1', message: 'Kategoria może zawierać tylko litery i spacje.', key: 'pattern' },
    { id: '2', message: 'Kategoria jest za krótka.', key: 'minlength' },
    { id: '3', message: 'Kategoria jest za długa.', key: 'maxlength' },
    { id: '4', message: 'Taka kategoria już istnieje.', key: 'matchValue' },
  ];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.categories = data.categories;
      this.isLoading = false;
      this.createForm();
      this.toggleSpinner();
    }, 1000);
  }

  createForm() {
    this.form = this.formBuilder.group({
      category: ['', { validators: [
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^([a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ]*\s?)+[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ]$/),
        Validators.required,
      ]}],
    },
    {
      validators: [
        matchValue('category', this.categories.map(category => category.category)),
      ],
    });
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
