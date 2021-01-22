import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { categories } from '@helpers/faq';
import { trackID } from '@helpers/index';
import { Alerts, FAQ, FAQs } from '@models/index';
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

  faqs: FAQs[] | FAQ[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  trackID = null;
  scrollTime = 1000;
  subscriptions: Subscription[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private faqService: FAQService,
  ) {
    this.trackID = trackID;

    this.subscriptions.push(
      this.faqService.getFAQs().subscribe((data: FAQ[]) => {
        this.faqs = data.length ? this.getCategories(data) : data;
      }),
    );

    this.isLoading = this.faqs.length ? false : true;
  }

  async ngOnInit() {
    if (this.faqs.length) {
      this.setLoading();
    }

    try {
      const response: FAQ[] = await this.faqService.fetchFAQs();
      this.faqService.setFAQs(response);
      this.setLoading();
    } catch (error) {
      if (error.status === 0) {
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
    return categories
      .reduce((prev: FAQs[], next: FAQs): FAQs[] => {
        const result = faqs.find(
          (category) => category.category === next.category,
        );

        if (result) {
          prev.push(next);
        }

        return prev;
      }, [])
      .sort(sortByCategory)
      .map((category: FAQs) => {
        category.questions = faqs.filter(
          (question) => question.category === category.category,
        );

        return category;
      });
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  computedID(link: string): string {
    return `#${link}`;
  }

  computedTitle(category: string): string {
    return `Przejdź do pytań dla kategorii ${category}`;
  }

  jumpTo(event: Event, target: string) {
    event.preventDefault();
    const newTarget: ElementRef = this.accordionHeader._results.filter(
      ({ nativeElement }) => nativeElement.id === `#${target}`,
    )[0];

    jump(newTarget.nativeElement, {
      duration: this.scrollTime,
      callback: () => {
        newTarget.nativeElement.setAttribute('tabindex', '0');
        newTarget.nativeElement.focus();

        setTimeout(
          () => newTarget.nativeElement.setAttribute('tabindex', '-1'),
          50,
        );
      },
    });
  }
}
