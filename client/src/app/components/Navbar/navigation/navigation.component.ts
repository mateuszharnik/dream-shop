import { Component, HostBinding, Input, OnDestroy, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Slide } from '@animations/index';
import { trackID } from '@helpers/index';
import { Links, User } from '@models/index';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Slide],
})
export class NavigationComponent implements OnDestroy {
  @ViewChildren('dropdown') dropdown: any = null;
  @ViewChildren('parent') parent: any = null;
  @HostBinding('class.block') display = true;
  @Input() links: Links[] = [];

  isOpen = false;
  isDisabled = false;
  isAnimated = false;
  animationTime = 450;
  trackID = null;
  user: User = null;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {
    this.trackID = trackID;

    this.subscriptions.push(this.userService.getUser().subscribe((user: User) => {
      this.user = user;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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
