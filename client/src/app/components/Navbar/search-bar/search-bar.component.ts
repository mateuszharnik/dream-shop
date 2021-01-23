import {
  Component,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Slide } from '@animations/index';
import { Navigation } from '@models/index';
import { NavigationService } from '@services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Slide],
})
export class SearchBarComponent implements OnDestroy {
  @ViewChild('search') search: any = null;
  @ViewChild('button') button: any = null;

  listener: () => void = null;
  subscriptions: Subscription[] = [];
  isFocus = false;
  searchText = '';
  searchBar: Navigation = {
    isOpen: false,
    isDisabled: false,
    isAnimated: false,
    animationTime: 350,
  };

  constructor(
    private navigationService: NavigationService,
    private renderer: Renderer2,
    private router: Router,
  ) {
    this.subscriptions.push(
      this.navigationService.getSearchBar().subscribe((data: Navigation) => {
        this.searchBar = data;
      }),
    );

    this.listener = this.renderer.listen(
      'document',
      'keyup',
      this.focusSearchBar,
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );

    if (this.listener) {
      this.listener();
    }
  }

  searchProducts() {
    this.router.navigate(['/produkty/wszystkie'], {
      queryParams: { search: this.searchText },
    });

    this.searchText = '';
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
    this.navigationService.toggle('searchBar');
    this.setFocus(this.searchBar.animationTime);
  }

  setFocus(animationTime: number) {
    setTimeout(() => {
      const element: HTMLElement = this.searchBar.isOpen
        ? this.search.nativeElement
        : this.button.nativeElement;

      element.focus();
    }, animationTime);
  }

  computedAriaExpanded(): string {
    return `${this.searchBar.isOpen}`;
  }
}
