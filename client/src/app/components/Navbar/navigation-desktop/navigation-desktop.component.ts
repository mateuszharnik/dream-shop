import {
  Component,
  HostBinding,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { trackID } from '@helpers/index';
import { User, ProductCategory, ProductCategoryWithPagination } from '@models/index';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-navigation-desktop',
  templateUrl: './navigation-desktop.component.html',
  styleUrls: ['./navigation-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavigationDesktopComponent implements OnDestroy {
  @HostBinding('class.block') display = true;
  @HostBinding('class.h-100') height = true;

  trackID = null;
  user: User = null;
  categories: ProductCategory[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private productsService: ProductsService,
  ) {
    this.trackID = trackID;

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

            this.categories = this.categories.sort((a, b) => {
              if (a.category === 'nowosci' || a.category === 'bestsellery') {
                return -1;
              } else {
                return 1;
              }
            });
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }
}
