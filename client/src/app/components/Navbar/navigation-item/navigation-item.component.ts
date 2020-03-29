import { Component, Input, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Slide } from '@animations/index';
import { Links } from '@models/index';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Slide],
})
export class NavigationItemComponent {
  @ViewChildren('dropdown') dropdown: any = null;
  @ViewChildren('parent') parent: any = null;
  @Input() link: Links = null;

  isOpen = false;
  isDisabled = false;
  isAnimated = false;
  animationTime = 450;

  computedIconClass(): string {
    const className = 'navigation__icon absolute ml-1 fas fa-chevron-right';
    return this.isOpen ? `${className} open` : className;
  }

  trackID(index: string, item: any): string {
    return item.id;
  }

  computedRouterLink(link: string): string {
    return `/produkty${link}`;
  }

  isLinkBestsellers(link: string): boolean {
    return link === '/bestsellery';
  }

  checkRequiredProp(prop: any, name: string) {
    if (!prop) {
      throw new Error(`Property "${name}" is required.`);
    }
  }

  toggle() {
    this.isAnimated = true;
    this.isDisabled = true;

    this.isOpen = !this.isOpen;

    setTimeout(() => {
      const element: HTMLElement = this.dropdown.first ?
        this.dropdown.first.nativeElement.querySelector('.navigation__link') : this.parent.first.nativeElement.firstElementChild;

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

  computedID(id: string): string {
    return `dropdown${id}`;
  }
}
