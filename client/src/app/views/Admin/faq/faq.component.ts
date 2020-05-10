import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { categories } from '@helpers/faq';
import { markdown } from '@helpers/index';
import { Alerts, FAQ, FAQs, DeleteResponse } from '@models/index';
import { FAQService } from '@services/faq.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import { FAQModals } from '@models/modals';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FAQComponent implements OnInit, OnDestroy {
  @ViewChild('deleteButton') deleteButton: any = null;

  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  questionToDelete: FAQ = null;
  subscriptions: Subscription[] = [];
  faqs: FAQs[] | FAQ[] = [];
  modals: FAQModals = {
    deleteFAQs: [],
    deleteFAQ: null,
  };

  constructor(private spinnerService: SpinnerService, private faqService: FAQService) {
    this.subscriptions.push(this.faqService.getFAQs().subscribe((data: FAQ[]) => {
      const faqs = data ? data.map((faq: FAQ) => {
        faq.content = markdown(faq.content);
        return faq;
      }) : data;

      this.faqs = faqs ? this.getCategories(faqs) : faqs;
    }));
  }

  async ngOnInit() {
    try {
      const response: FAQ[] = await this.faqService.fetchFAQs();
      this.faqService.setFAQs(response);
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

  getCategories(faqs: FAQ[]): FAQs[] {
    const sortByCategory = (a: FAQs, b: FAQs): number => {
      if (a.category > b.category) {
        return 1;
      } else if (a.category < b.category) {
        return -1;
      }

      return 0;
    };
    return categories.reduce((prev: FAQs[], next: FAQs): FAQs[] => {
      const result = faqs.find(category => category.category === next.category);

      if (result) {
        prev.push(next);
      }

      return prev;
    }, []).sort(sortByCategory).map((category: FAQs) => {
      category.questions = faqs.filter(question => question.category === category.category);

      return category;
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
    return `edytuj/${id}`;
  }

  async deleteFAQ(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: FAQ = await this.faqService.deleteFAQ(id);
      const faqs: FAQ[] = await this.faqService.fetchFAQs();
      this.faqService.setFAQs(faqs);
      this.setAlerts('', '', 'Pomyślnie usunięto pytanie');
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteFAQ');
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  async deleteFAQs() {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: DeleteResponse = await this.faqService.deleteFAQs();
      this.faqService.setFAQs([]);
      this.setAlerts('', '', `Pomyślnie usunięto wszystkie pytania`);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteFAQs');
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
    if (this.modals.deleteFAQ || this.modals.deleteFAQs.length) {
      return;
    }

    if (question) {
      this.modals.deleteFAQ = question;
    } else {
      this.modals.deleteFAQs = this.faqs;
    }

    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      this.deleteButton.button.nativeElement.focus();
    }, 50);
  }

  closeModal(key: 'deleteFAQ' | 'deleteFAQs') {
    if (key === 'deleteFAQ') {
      this.modals.deleteFAQ = null;
      return;
    }

    this.modals.deleteFAQs = [];
  }
}
