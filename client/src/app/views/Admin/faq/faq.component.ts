import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { categories } from '@helpers/faq';
import { markdown, trackID } from '@helpers/index';
import { Alerts, DeleteResponse, FAQ, FAQs } from '@models/index';
import { FAQModals } from '@models/modals';
import { AlertsService } from '@services/alerts.service';
import { FAQService } from '@services/faq.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import jump from 'jump.js';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FAQComponent implements OnInit, OnDestroy {
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  trackID = null;
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

  constructor(
    private spinnerService: SpinnerService,
    private faqService: FAQService,
    private alertsService: AlertsService,
    private router: Router,
  ) {
    this.subscriptions.push(this.faqService.getFAQs().subscribe((data: FAQ[]) => {
      const faqs = data ? data.map((faq: FAQ) => {
        faq.content = markdown(faq.content);
        return faq;
      }) : data;

      this.faqs = faqs ? this.getCategories(faqs) : faqs;
    }));

    this.subscriptions.push(this.alertsService.getAlert().subscribe((data: string) => {
      this.setAlerts('', '', data);
    }));

    this.trackID = trackID;
  }

  async ngOnInit() {
    try {
      const response: FAQ[] = await this.faqService.fetchFAQs();
      this.faqService.setFAQs(response);
      this.setLoading();
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.setLoading();
    }
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
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
    this.alertsService.setAlert('');
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  buttonTitle(value: boolean): 'Usuń pytanie' | 'Usuwanie pytania' {
    return value ? 'Usuwanie pytania' : 'Usuń pytanie';
  }

  buttonText(value: boolean): 'Usuń' | 'Usuwanie' {
    return value ? 'Usuwanie' : 'Usuń';
  }

  editLink(id: string): string {
    return `edytuj/${id}`;
  }

  async deleteFAQ(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: FAQ = await this.faqService.deleteFAQ(id);
      const faqs: FAQ[] = await this.faqService.fetchFAQs();
      this.faqService.setFAQs(faqs);
      this.setAlerts('', '', 'Pomyślnie usunięto pytanie.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteFAQ');
      this.isDisabled = false;
      this.isSubmitted = false;
      jump('.admin-page', {
        duration: 1000,
      });
    }
  }

  async deleteFAQs() {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: DeleteResponse = await this.faqService.deleteFAQs();
      this.faqService.setFAQs([]);
      this.setAlerts('', '', `Pomyślnie usunięto wszystkie pytania.`);
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteFAQs');
      this.isDisabled = false;
      this.isSubmitted = false;
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
  }

  closeModal(key: 'deleteFAQ' | 'deleteFAQs') {
    if (key === 'deleteFAQ') {
      this.modals.deleteFAQ = null;
      return;
    }

    this.modals.deleteFAQs = [];
  }
}
