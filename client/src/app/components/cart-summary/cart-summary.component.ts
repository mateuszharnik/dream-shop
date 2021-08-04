import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  Order,
  OrderContact,
  OrderProduct,
} from '@models/index';
import { CartService } from '@services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartSummaryComponent implements OnDestroy {
  @Input() isSubmitted = false;
  @Output() prevStep: EventEmitter<any> = new EventEmitter<any>();
  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();

  subscriptions: Subscription[] = [];
  products: OrderProduct[] = [];
  contact: OrderContact = null;

  constructor(private cartService: CartService) {
    this.subscriptions.push(
      this.cartService
        .getFullProducts()
        .subscribe((products: OrderProduct[]) => {
          this.products = products;
        }),
    );

    this.subscriptions.push(
      this.cartService.getContact().subscribe((contact: OrderContact) => {
        this.contact = contact;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  getOrder(): Order {
    return { products: this.products, contact: this.contact };
  }

  onNextStep(event) {
    this.nextStep.emit({
      products: this.products,
      contact: this.contact,
    });
  }

  onPrevStep(event) {
    this.prevStep.emit(event);
  }
}
