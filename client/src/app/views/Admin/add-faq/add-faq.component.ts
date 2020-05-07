import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert, Alerts, FAQCategories, FAQ } from '@models/index';
import { FAQService } from '@services/faq.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddFAQComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  isLoading = true;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isDisabled = false;
  isSubmitted = false;
  categories: FAQCategories[] = [];
  subscriptions: Subscription[] = [];

  categoryAlerts: Alert[] = [
    { id: '0', message: 'Musisz wybrać kategorię.', key: 'required' },
  ];
  titleAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać pytanie.', key: 'required' },
    { id: '1', message: 'Pytanie zawiera niedozwolone znaki.', key: 'pattern' },
    { id: '2', message: 'Pytanie jest za krótkie.', key: 'minlength' },
    { id: '3', message: 'Pytanie jest za długie.', key: 'maxlength' },
  ];
  contentAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać odpowiedź.', key: 'required' },
    { id: '2', message: 'Odpowiedź jest za krótka.', key: 'minlength' },
    { id: '3', message: 'Odpowiedź jest za długa.', key: 'maxlength' },
  ];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder, private faqService: FAQService) {
    this.subscriptions.push(this.faqService.getCategories().subscribe((data: FAQCategories[]) => {
      this.categories = data;
    }));
  }

  async ngOnInit() {
    try {
      const response: FAQCategories[] = await this.faqService.fetchCategories();
      this.faqService.setCategories(response);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isLoading = false;
      this.createForm(this.categories);
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

  createForm(categories: FAQCategories[]) {
    this.form = this.formBuilder.group({
      title: ['', {
        validators: [
          Validators.pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-, .%@$!&\(\)+=?/]+$/),
          Validators.minLength(10),
          Validators.maxLength(1000),
          Validators.required,
        ],
      }],
      content: ['', {
        validators: [
          Validators.minLength(10),
          Validators.maxLength(5000),
          Validators.required,
        ],
      }],
      category: [null, {
        validators: [
          Validators.required,
        ],
      }],
    });

    this.formControls.category.setValue(categories[0].category, { onlySelf: true });
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

    try {
      const response: FAQ = await this.faqService.saveFAQ(this.form.value);
      const faqs: FAQ[] = await this.faqService.fetchFAQs();
      this.faqService.setFAQs(faqs);
      this.setAlerts('', '', 'Pomyślnie dodano pytanie');
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      const category: string = this.form.value.category;
      this.form.reset();
      this.formControls.category.setValue(category, { onlySelf: true });
      this.isDisabled = false;
      this.isSubmitted = false;
    }
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
