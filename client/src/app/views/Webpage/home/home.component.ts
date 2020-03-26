import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Data, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Contact, Links, SocialMediaLinks } from '@models/index';
import { HeightService } from '@services/height.service';
import { NavigationService } from '@services/navigation.service';
import { Subscription } from 'rxjs';

const links: Links[] = [
  {
    id: '0',
    category: 'Paznokcie',
    title: 'Produkty do paznokci',
    links: [
      {
        id: '90',
        category: 'Lakiery hybrydowe',
        title: 'Lakiery do paznokci hybrydowych',
        link: '/lakiery-hybrydowe',
      },
      {
        id: '91',
        category: 'Lakiery żelowe',
        title: 'Lakiery do paznokci żelowych',
        link: '/lakiery-zelowe',
      },
      {
        id: '92',
        category: 'Zwykłe lakiery',
        title: 'Zwykłe lakiery do paznokci',
        link: '/zwykle-lakiery',
      },
    ],
  },
  {
    id: '1',
    category: 'Buty',
    title: 'Buty',
    links: [
      {
        id: '10',
        category: 'Kobiety',
        title: 'Dla kobiet',
        links: [
          {
            id: '100',
            category: 'Adidasy',
            title: 'Adidasy dla kobiet',
            link: '/adidasy-dla-kobiet',
          },
          {
            id: '101',
            category: 'Kozaki',
            title: 'Kozaki dla kobiet',
            link: '/kozaki-dla-kobiet',
          },
        ],
      },
      {
        id: '11',
        category: 'Mężczyzni',
        title: 'Dla mężczyzn',
        links: [
          {
            id: '110',
            category: 'Adidasy',
            title: 'Adidasy dla mężczyzn',
            link: '/adidasy-dla-mezczyzn',
          },
          {
            id: '111',
            category: 'Klapki',
            title: 'Klapki dla mężczyzn',
            link: '/klapki-dla-mezczyzn',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    category: 'Włosy',
    title: 'Produkty do włosów',
    links: [
      {
        id: '20',
        category: 'Odżywki',
        title: 'Odżywki do włosów',
        link: '/odzywki-do-wlosow',
      },
      {
        id: '21',
        category: 'Szampony',
        title: 'Szampony do włosów',
        link: '/szampony-do-wlosow',
      },
    ],
  },
];

const socialMediaLinks: SocialMediaLinks = {
  facebook: '/',
  linkedin: '/',
  instagram: '/',
  twitter: '/',
};

const contactData: Contact = {
  id: '0',
  email: 'kontakt@dream.pl',
  phone: '+48 123 123 123',
  nip: '1243424',
  adress: {
    street: 'Street',
    streetNumber: '7/21',
    city: 'City',
    code: '25-100',
  },
  workHours: '08:30 - 18:30',
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NavigationService, HeightService],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('mainEl') mainEl: any;
  @ViewChild('header') header: any;

  tabIndex = -1;
  isLoading = true;
  subscriptions: Subscription[] = [];
  height: number = null;
  contactData: Contact = null;
  socialMediaLinks: SocialMediaLinks = null;
  links: Links[] = [
    {
      id: '-1',
      category: 'Wszystkie',
      title: 'Nasze wszystkie produkty',
      link: '/',
    },
    {
      id: '-2',
      category: 'Bestsellery',
      title: 'Najlepiej sprzedające się produkty',
      link: '/bestsellery',
    },
  ];

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private heightService: HeightService,
  ) {}

  ngOnInit() {
    this.setHeight();
    this.closeMenuOnRouteChange();
    this.links = this.links.concat(links);
    this.socialMediaLinks = socialMediaLinks;
    this.contactData = contactData;

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.navigationService.closeMenu();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  ngAfterViewChecked() {
    if (this.mainEl) {
      const height: number = this.mainEl.nativeElement.offsetHeight + this.mainEl.nativeElement.offsetTop;

      if (height !== this.height) {
        this.heightService.setHeight(height);
      }
    }
  }

  closeMenuOnRouteChange() {
    this.subscriptions.push(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.navigationService.closeMenu();
        this.setFocus();
      }
    }));
  }

  skipNavigation() {
    this.navigationService.closeMenu();
    this.setFocus();
  }

  setHeight() {
    this.subscriptions.push(this.heightService.getHeight().subscribe((height: number) => {
      this.height = height;
    }));
  }

  setFocus() {
    this.tabIndex = 0;
    this.header.nativeElement.focus();

    setTimeout(() => {
      this.tabIndex = -1;
    }, 10);
  }

  prepareRoute(outlet: RouterOutlet): RouterOutlet | Data {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
