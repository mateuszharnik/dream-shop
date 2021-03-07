import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Order, OrderProduct } from '@models/index';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderSummaryComponent {
  @Input() order: Order = null;

  totalQuantity(): number {
    return this.order.products.reduce(
      (quantity: number, product: OrderProduct) => {
        quantity += Number(product.quantity);

        return quantity;
      },
      0,
    );
  }

  totalPrice(): string {
    const totalPrice: number = this.order.products.reduce(
      (price: number, product: OrderProduct) => {
        price += parseFloat(product.price.replace(',', '.'));

        return price;
      },
      0,
    );

    return `${totalPrice.toFixed(2).replace('.', ',')}`;
  }
}
