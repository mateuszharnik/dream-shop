import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Data, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Contact, Links, SocialMediaLinks } from '@models/index';
import { HeightService } from '@services/height.service';
import { NavigationService } from '@services/navigation.service';
import { Subscription } from 'rxjs';
import { contact, socialMediaLinks, navLinks } from '@helpers/fakeAPI';

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
    this.links = this.links.concat(navLinks);
    this.socialMediaLinks = socialMediaLinks;
    this.contactData = contact;

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
