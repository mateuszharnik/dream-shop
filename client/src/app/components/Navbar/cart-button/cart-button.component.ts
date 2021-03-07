import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ProductInCart } from '@models/index';
import { CartService } from '@services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartButtonComponent implements OnDestroy {
  cart: ProductInCart[] = [];
  subscriptions: Subscription[] = [];

  constructor(private cartService: CartService) {
    this.subscriptions.push(
      this.cartService.getProducts().subscribe((products: ProductInCart[]) => {
        this.cart = products;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }
}
