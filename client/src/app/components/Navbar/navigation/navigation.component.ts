import { Component, HostBinding, Input, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Slide } from '@animations/index';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Slide],
})
export class NavigationComponent {
  @ViewChildren('dropdown') dropdown: any = null;
  @ViewChildren('parent') parent: any = null;
  @HostBinding('class.block') display = true;
  @Input() links: Links[] = [];

  isOpen = false;
  isDisabled = false;
  isAnimated = false;
  animationTime = 450;

  trackID(index: string, item: any): string {
    return item.id;
  }

  computedIconClass(): string {
    const className = 'navigation__icon absolute ml-1 fas fa-chevron-right';
    return this.isOpen ? `${className} open` : className;
  }

  toggle() {
    this.isAnimated = true;
    this.isDisabled = true;

    this.isOpen = !this.isOpen;

    setTimeout(() => {
      const element: HTMLElement = this.dropdown.first ?
        this.dropdown.first.nativeElement.querySelector('.navigation__link') :
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

interface Links {
  id: string;
  category: string;
  title: string;
  link?: string;
  links?: Links[];
}
