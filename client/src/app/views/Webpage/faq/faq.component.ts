import { Component, ElementRef, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { faqs } from '@helpers/fakeAPI';
import { trackID } from '@helpers/index';
import { FAQs } from '@models/index';
import { SpinnerService } from '@services/spinner.service';
import jump from 'jump.js';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FaqComponent implements OnInit {
  @ViewChildren('accordionHeader') accordionHeader = null;

  accordions: FAQs[] = null;
  isLoading = true;
  trackID = null;
  scrollTime = 1000;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.trackID = trackID;

    setTimeout(() => {
      this.accordions = faqs;
      this.isLoading = false;
      this.toggleSpinner();
    }, 1000);
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
