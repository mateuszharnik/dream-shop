import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Slide } from '@animations/index';
import { NavigationService } from '@services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Slide],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('nav', { read: ElementRef }) nav: any = null;
  @ViewChild('button', { read: ElementRef }) button: any = null;
  @Input() links: Links[] = [];

  subscriptions: Subscription[] = [];
  navigation: Navigation = {
    isOpen: false,
    isDisabled: false,
    isAnimated: false,
    animationTime: 450,
  };

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.subscriptions.push(this.navigationService.getNavigation().subscribe((data: Navigation) => {
      this.navigation = data;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  toggle() {
    this.navigationService.toggle('navigation');
    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      const element: HTMLElement = this.navigation.isOpen ?
        this.nav.nativeElement.querySelector('#productsDropdown') :
        this.button.nativeElement.firstElementChild.firstElementChild;

      element.focus();
    }, this.navigation.animationTime);
  }

  computedAriaExpanded(): string {
    return `${this.navigation.isOpen}`;
  }
}

interface Links {
  id: string;
  category: string;
  title: string;
  link?: string;
  links?: Links[];
}

interface Navigation {
  isOpen: boolean;
  isDisabled: boolean;
  isAnimated: boolean;
  animationTime: number;
}
