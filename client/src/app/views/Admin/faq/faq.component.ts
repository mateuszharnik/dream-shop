import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { FAQ, Alerts } from '@models/index';
import { Subscription } from 'rxjs';
import { FAQService } from '@services/faq.service';
import { markdown } from '@helpers/index';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FAQComponent implements OnInit, OnDestroy {
  @ViewChild ('deleteButton') deleteButton: any = null;

  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  categories: string[] = [];
  questionToDelete: FAQ = null;
  subscriptions: Subscription[] = [];
  faqs: FAQ[] = [];

  constructor(private spinnerService: SpinnerService, private faqService: FAQService) {
    this.subscriptions.push(this.faqService.getFAQs().subscribe((data: FAQ[]) => {
      this.faqs = data ? data.map((faq: FAQ) => {
        faq.content = markdown(faq.content);
        return faq;
      }) : data;
    }));
  }

  async ngOnInit() {
    try {
      const response: FAQ[] = await this.faqService.fetchFAQs();
      this.faqService.setFAQs(response);
      this.getCategories(response);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isLoading = false;
      this.toggleSpinner();
    }
  }

  getCategories(response: FAQ[]) {
    this.categories = [];
    response.forEach((faq: FAQ) => {
      if (this.categories.indexOf(faq.category) === -1) {
        this.categories.push(faq.category);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  computedButtonTitle(): 'Usuń pytanie' | 'Usuwanie pytania' {
    return this.isDisabled ? 'Usuwanie pytania' : 'Usuń pytanie';
  }

  computedButtonText(): 'Usuń' | 'Usuwanie' {
    return this.isDisabled ? 'Usuwanie' : 'Usuń';
  }

  computedFAQEditLink(id: string): string {
    return `${id}/edytuj`;
  }

  async submit(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: FAQ = await this.faqService.deleteFAQ(id);
      const faqs: FAQ[] = await this.faqService.fetchFAQs();
      this.faqService.setFAQs(faqs);
      this.getCategories(faqs);
      this.setAlerts('', '', 'Pomyślnie usunięto pytanie');
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal();
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  openModal(question: FAQ) {
    if (!this.questionToDelete) {
      this.questionToDelete = question;
      this.setFocus();
    }
  }

  setFocus() {
    setTimeout(() => {
      this.deleteButton.button.nativeElement.focus();
    }, 50);
  }

  closeModal() {
    this.questionToDelete = null;
  }
}
