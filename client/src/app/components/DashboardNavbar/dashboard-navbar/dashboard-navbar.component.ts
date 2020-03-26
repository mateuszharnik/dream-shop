import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SlideLeft } from '@animations/index';
import { MatchMediaService } from '@services/match-media.service';
import { Subscription } from 'rxjs';
import { NavigationService } from '@services/navigation.service';

interface Navigation {
  isOpen: boolean;
  isDisabled: boolean;
  isAnimated: boolean;
  animationTime: number;
}

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [SlideLeft],
})
export class DashboardNavbarComponent implements OnInit, OnDestroy {
  @ViewChild('nav', { read: ElementRef }) nav: any = null;
  @ViewChild('button', { read: ElementRef }) button: any = null;

  navigation: Navigation = {
    isOpen: false,
    isDisabled: false,
    isAnimated: false,
    animationTime: 450,
  };
  isDesktop = false;
  subscriptions: Subscription[] = [];

  productItems = [{
    link: '/admin/produkty',
    text: 'Przeglądaj',
    title: 'Zobacz wszystkie produkty',
    icon: 'far fa-eye',
  }, {
    link: '/admin/produkty/dodaj',
    text: 'Dodaj',
    title: 'Dodaj nowy produkt',
    icon: 'fas fa-plus',
  }];
  siteItems = [{
    link: '/admin/strony/o-nas',
    text: 'O nas',
    title: 'Edytuj informacje o sklepie',
    icon: 'far fa-address-card',
  }, {
    link: '/admin/strony/kontakt',
    text: 'Kontakt',
    title: 'Edytuj informacje kontaktowe',
    icon: 'fas fa-phone',
  }, {
    link: '/admin/strony/najczesciej-zadawane-pytania',
    text: 'Najczęściej zadawane pytania',
    title: 'Edytuj najczęściej zadawane pytania',
    icon: 'fas fa-question',
  }];

  constructor(private matchMediaService: MatchMediaService, private navigationService: NavigationService) {}

  ngOnInit() {
    this.subscriptions.push(this.navigationService.getNavigation().subscribe((data: Navigation) => {
      this.navigation = data;
    }));

    this.subscriptions.push(this.matchMediaService.getDevice().subscribe((isDesktop: boolean) => {
      this.isDesktop = isDesktop;

      if (this.isDesktop) {
        this.toggle(true);
      } else {
        this.toggle(false);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  toggle(open?: boolean, focus: boolean = true) {
    this.navigationService.toggle('navigation', open);

    if (focus) {
      this.setFocus();
    }
  }

  setFocus() {
    setTimeout(() => {
      const element: HTMLElement = this.nav ?
          this.nav.nativeElement.querySelector('.dashboard-navigation__link') :
          this.button.nativeElement.firstElementChild.firstElementChild;

      element.focus();
    }, this.navigation.animationTime);
  }

  computedHamburgerTitle(): 'Zamknij menu' | 'Otwórz menu' {
    return this.navigation.isOpen ? 'Zamknij menu' : 'Otwórz menu';
  }

  computedAriaExpanded(): string {
    return `${this.navigation.isOpen}`;
  }
}
