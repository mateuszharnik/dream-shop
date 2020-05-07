import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Alert, FAQ, FAQCategories, Alerts } from '@models/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import { FAQService } from '@services/faq.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditFAQComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  id: string = null;
  isSubmitted = false;
  categories: FAQCategories[] = [];
  subscriptions: Subscription[] = [];
  faq: FAQ = null;

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

  constructor(
    private activateRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private faqService: FAQService,
  ) {
    this.subscriptions.push(this.faqService.getCategories().subscribe((data: FAQCategories[]) => {
      this.categories = data;
    }));
  }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;

    try {
      const categoriesResponse: FAQCategories[] = await this.faqService.fetchCategories();
      this.faq = await this.faqService.fetchFAQ(this.id);
      this.faqService.setCategories(categoriesResponse);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isLoading = false;
      this.createForm(this.faq, this.categories);
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

  createForm(faq: FAQ, categories: FAQCategories[]) {
    const title = faq && faq.title ? faq.title : '';
    const content = faq && faq.content ? faq.content : '';
    const category = faq && faq.category ? faq.category : '';

    this.form = this.formBuilder.group({
      title: [title, {
        validators: [
          Validators.pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-, .%@$!&\(\)+=?/]+$/),
          Validators.minLength(10),
          Validators.maxLength(1000),
          Validators.required,
        ],
      }],
      content: [content, {
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

    this.formControls.category.setValue(category || categories[0], { onlySelf: true });
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
      const response: FAQ = await this.faqService.updateFAQ(this.id, this.form.value);
      const faqs: FAQ[] = await this.faqService.fetchFAQs();
      this.faqService.setFAQs(faqs);
      this.setAlerts('', '', 'Pomyślnie zaktualizowano pytanie');
    } catch (error) {
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

  get formControls() {
    return this.form.controls;
  }
}
