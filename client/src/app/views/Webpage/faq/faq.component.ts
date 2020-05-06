import { Component, ElementRef, OnDestroy, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { trackID } from '@helpers/index';
import { Alerts, FAQ } from '@models/index';
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
export class FaqComponent implements OnInit, OnDestroy {
  @ViewChildren('accordionHeader') accordionHeader = null;

  faqs: FAQ[] = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  trackID = null;
  scrollTime = 1000;
  categories: string[] = [];
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService, private faqService: FAQService) {
    this.subscriptions.push(this.faqService.getFAQs().subscribe((data: FAQ[]) => {
      this.faqs = data;
    }));

    this.isLoading = this.faqs ? false : true;
  }

  async ngOnInit() {
    this.trackID = trackID;

    if (this.faqs) {
      this.isLoading = false;
      return this.toggleSpinner();
    }

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

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  computedID(link: string): string {
    return `#${link}`;
  }

  computedTitle(category: string): string {
    return `Przejdź do pytań dla kategorii ${category}`;
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  jumpTo(event: Event, target: string) {
    event.preventDefault();
    const newTarget: ElementRef = this.accordionHeader._results.filter(({ nativeElement }) => nativeElement.id === `#${target}`)[0];

    jump(newTarget.nativeElement, {
      duration: this.scrollTime,
      callback: () => {
        newTarget.nativeElement.setAttribute('tabindex', '0');
        newTarget.nativeElement.focus();

        setTimeout(() => newTarget.nativeElement.setAttribute('tabindex', '-1'), 50);
      },
    });
  }
}
