import { Component, Input, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Slide } from '@animations/index';
import { trackID } from '@helpers/index';

@Component({
  selector: 'app-dashboard-navbar-list',
  templateUrl: './dashboard-navbar-list.component.html',
  styleUrls: ['./dashboard-navbar-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Slide],
})
export class DashboardNavbarListComponent {
  @ViewChildren('dropdown') dropdown: any = null;
  @ViewChildren('parent') parent: any = null;
  @Input() buttonTitle: string;
  @Input() buttonText: string;
  @Input() icon: string;
  @Input() items = [];

  isOpen = false;
  isDisabled = false;
  isAnimated = false;
  animationTime = 450;
  trackID = null;

  constructor() {
    this.trackID = trackID;
  }

  computedIconClass(icon: string): string {
    return `${icon} mr-1 dashboard-navigation__icon`;
  }

  toggle() {
    this.isAnimated = true;
    this.isDisabled = true;

    this.isOpen = !this.isOpen;

    setTimeout(() => {
      const element: HTMLElement = this.dropdown.first ?
        this.dropdown.first.nativeElement.querySelector('.dashboard-navigation__link') :
        this.parent.first.nativeElement;

      this.isDisabled = false;
      this.isAnimated = false;

      this.setFocus(element);
    }, this.animationTime);
  }

  setFocus(el: HTMLElement) {
    setTimeout(() => el.focus(), 50);
  }

  computedAriaExpanded(): string {
    return `${this.isOpen}`;
  }
}
