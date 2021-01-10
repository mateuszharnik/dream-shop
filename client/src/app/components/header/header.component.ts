import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Slide } from '@animations/index';
import { NavigationService } from '@services/navigation.service';
import { Subscription } from 'rxjs';
import { Navigation } from '@models/index';
import { MatchMediaService } from '@services/match-media.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MatchMediaService],
  animations: [Slide],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('nav', { read: ElementRef }) nav: any = null;
  @ViewChild('button', { read: ElementRef }) button: any = null;

  subscriptions: Subscription[] = [];
  isDesktop = false;
  navigation: Navigation = {
    isOpen: false,
    isDisabled: false,
    isAnimated: false,
    animationTime: 350,
  };

  constructor(
    private navigationService: NavigationService,
    private matchMediaService: MatchMediaService,
  ) {
    this.subscriptions.push(
      this.matchMediaService.getDevice().subscribe((isDesktop: boolean) => {
        this.isDesktop = isDesktop;
        if (isDesktop) {
          this.navigation.isOpen = false;
          this.navigation.isDisabled = false;
          this.navigation.isAnimated = false;
        }
      }),
    );

    this.subscriptions.push(
      this.navigationService.getNavigation().subscribe((data: Navigation) => {
        this.navigation = data;
      }),
    );
  }

  ngOnInit() {
    this.matchMediaService.initMatchMedia('768px');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  toggle() {
    this.navigationService.toggle('navigation');
    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      const element: HTMLElement = this.navigation.isOpen
        ? this.nav.nativeElement.querySelector('#productsDropdown')
        : this.button.nativeElement.firstElementChild.firstElementChild;

      element.focus();
    }, this.navigation.animationTime);
  }

  computedAriaExpanded(): string {
    return `${this.navigation.isOpen}`;
  }
}
