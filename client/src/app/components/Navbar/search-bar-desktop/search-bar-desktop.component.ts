import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar-desktop',
  templateUrl: './search-bar-desktop.component.html',
  styleUrls: ['./search-bar-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarDesktopComponent implements OnInit, OnDestroy {
  @ViewChild('search') search: any = null;
  @ViewChild('button') button: any = null;

  focusSearchBarListener = null;
  closeSearchBarListener = null;
  subscriptions: Subscription[] = [];
  isFocus = false;
  searchText = '';
  isOpen = false;

  constructor(private renderer: Renderer2, private router: Router) {
    this.focusSearchBarListener = this.renderer.listen(
      'document',
      'keyup',
      this.focusSearchBar,
    );

    this.closeSearchBarListener = this.renderer.listen(
      'window',
      'click',
      this.closeSearchBar,
    );

    this.subscriptions.push(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.isOpen = false;
        }
      }),
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );

    if (this.closeSearchBarListener) {
      this.closeSearchBarListener();
    }

    if (this.focusSearchBarListener) {
      this.focusSearchBarListener();
    }
  }

  searchProducts() {
    this.router.navigate(['/produkty'], {
      queryParams: { search: this.searchText },
    });

    this.searchText = '';
  }

  closeSearchBar = (event) => {
    const className = event.target.className;
    const buttonClass = 'search-button';
    const inputClass = 'search-bar-form__input';

    if (
      this.isOpen &&
      className !== buttonClass &&
      !className.includes(inputClass)
    ) {
      this.isOpen = false;
    }
  }

  focusSearchBar = (event: KeyboardEvent) => {
    const names: Array<string> = ['INPUT', 'TEXTAREA'];
    const node: string = event.view.document.activeElement.nodeName.toUpperCase();

    if (names.indexOf(node) === -1) {
      if (this.search && !this.isFocus && event.key === '/') {
        this.setFocus(0);
      } else if (!this.search && !this.isFocus && event.key === '/') {
        this.toggle();
      }
    }
  }

  onFocus() {
    this.isFocus = true;
  }

  onBlur() {
    this.isFocus = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.setFocus(0);
  }

  setFocus(animationTime: number) {
    setTimeout(() => {
      const element: HTMLElement = this.isOpen
        ? this.search.nativeElement
        : this.button.nativeElement;

      element.focus();
    }, animationTime);
  }

  computedAriaExpanded(): string {
    return `${this.isOpen}`;
  }
}
