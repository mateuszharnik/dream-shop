import {
  Component,
  HostBinding,
  OnDestroy,
  Renderer2,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { trackID } from '@helpers/index';
import { User, ProductCategory, ProductCategoryWithPagination } from '@models/index';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '@services/products.service';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-navigation-desktop',
  templateUrl: './navigation-desktop.component.html',
  styleUrls: ['./navigation-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavigationDesktopComponent implements OnDestroy {
  @ViewChildren('dropdown') dropdown: any = null;
  @ViewChildren('parent') parent: any = null;
  @HostBinding('class.block') display = true;
  @HostBinding('class.h-100') height = true;

  isOpen = false;
  trackID = null;
  closeMenuListener = null;
  user: User = null;
  categories: ProductCategory[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private productsService: ProductsService,
    private renderer: Renderer2,
  ) {
    this.trackID = trackID;

    this.closeMenuListener = this.renderer.listen(
      'window',
      'click',
      this.closeMenu,
    );

    this.subscriptions.push(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.isOpen = false;
        }
      }),
    );

    this.subscriptions.push(
      this.userService.getUser().subscribe((user: User) => {
        this.user = user;
      }),
    );

    this.subscriptions.push(
      this.productsService
        .getCategories()
        .subscribe((data: ProductCategoryWithPagination) => {
          if (data && data.categories) {
            const categoriesWithCount: ProductCategory[] = data.categories.filter(
              (category: ProductCategory): boolean => category.count > 0,
            );

            this.categories = data.categories.filter(
              (category: ProductCategory): boolean => {
                const showBestsellers: boolean =
                  categoriesWithCount.length &&
                  (category.category === 'bestsellery' ||
                    category.category === 'nowosci');

                return !!category.count || showBestsellers;
              },
            );
          }
        }),
    );
  }

  ngOnDestroy() {
    if (this.closeMenuListener) {
      this.closeMenuListener();
    }

    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  closeMenu = (event) => {
    const className = event.target.className;
    const buttonClass = 'navigation__link navigation__link--pointer relative block text-left';

    if (this.isOpen && className !== buttonClass) {
      this.isOpen = false;
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
