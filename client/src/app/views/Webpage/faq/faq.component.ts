import { Component, ElementRef, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { trackID } from '@helpers/index';
import { SpinnerService } from '@services/spinner.service';
import jump from 'jump.js';

const accordionsData: Accordion[] = [
  {
    id: '1',
    category: 'zwroty',
    icon: 'fas fa-undo',
    title: 'Zwroty i reklamacje',
    accordions: [
      {
        id: '11',
        title: 'Po jakim czasie mogę zwrócić zakupiony produkt',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '12',
        title: 'Reklamacja 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '13',
        title: 'Reklamacja 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '14',
        title: 'Reklamacja 4',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '15',
        title: 'Reklamacja 5',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '2',
    category: 'dostawa',
    title: 'Dostawa i wysyłka',
    icon: 'fas fa-truck',
    accordions: [
      {
        id: '21',
        title: 'Dostawa 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '22',
        title: 'Dostawa 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '23',
        title: 'Dostawa 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '4',
    category: 'obsługa',
    icon: 'fas fa-headphones',
    title: 'Obsługa klienta',
    accordions: [
      {
        id: '41',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '42',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '43',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '5',
    category: 'płatności',
    icon: 'far fa-credit-card',
    title: 'Płatności i przelewy',
    accordions: [
      {
        id: '51',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '52',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '53',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '6',
    category: 'produkty',
    icon: 'fas fa-tshirt',
    title: 'Produkty',
    accordions: [
      {
        id: '61',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '62',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '63',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '7',
    category: 'rabaty',
    icon: 'fas fa-percent',
    title: 'Rabaty i kupony',
    accordions: [
      {
        id: '71',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '72',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '73',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '3',
    category: 'inne',
    icon: 'fas fa-question',
    title: 'Inne pytania',
    accordions: [
      {
        id: '31',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '32',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '33',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
];

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FaqComponent implements OnInit {
  @ViewChildren('accordionHeader') accordionHeader = null;

  accordions: Accordion[] = null;
  isLoading = true;
  trackID = null;
  scrollTime = 1000;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.trackID = trackID;

    setTimeout(() => {
      this.accordions = accordionsData;
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

interface Accordion {
  id: string;
  category: string;
  icon: string;
  title: string;
  accordions: Accordions[];
}

interface Accordions {
  id: string;
  title: string;
  content: string;
}
