import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  Alerts,
  OrderProduct,
  ProductInCart,
} from '@models/index';
import { CartService } from '@services/cart.service';
import { ProductsService } from '@services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-in-cart',
  templateUrl: './products-in-cart.component.html',
  styleUrls: ['./products-in-cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsInCartComponent implements OnInit, OnDestroy {
  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();

  isLoading = true;
  cart: ProductInCart[] = [];
  products: OrderProduct[] = [];
  subscriptions: Subscription[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
  ) {
    this.subscriptions.push(
      this.cartService.getProducts().subscribe((products: ProductInCart[]) => {
        this.cart = products;
        if (this.products.length) {
          if (this.cart.length) {
            this.products = this.getProductsInfo(this.products);
            this.cartService.setFullProducts(this.products);
          } else {
            this.products = [];
          }
        }
      }),
    );
  }

  getProductsInfo(products: any[]): OrderProduct[] {
    return products.map(
      (product): OrderProduct => {
        const productInCart: ProductInCart = this.cart.find(
          (element) => element._id === product._id,
        );

        const quantity = productInCart.quantity;
        const {
          _id,
          name,
          thumbnail,
          price,
          category_name,
          company_name,
        } = product;

        return {
          _id,
          name,
          thumbnail,
          price,
          category_name,
          company_name,
          quantity,
        };
      },
    );
  }

  async ngOnInit() {
    try {
      const { products } = await this.productsService.fetchProductsInCart(
        this.cart,
      );

      if (products.length) {
        this.products = this.getProductsInfo(products);
        this.cartService.setFullProducts(this.products);
      } else {
        this.cartService.removeProducts();
      }

      this.isLoading = false;
    } catch (error) {
      if (error.status === 0) {
        this.cartService.removeProducts();
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  totalPrice(): string {
    const totalPrice: number = this.products.reduce(
      (price: number, product: OrderProduct) => {
        price += parseFloat(product.price.replace(',', '.'));

        const productInCart: ProductInCart = this.cart.find(
          (element) => element._id === product._id,
        );

        price = price * productInCart.quantity;

        return price;
      },
      0,
    );

    const arr: string[] = totalPrice.toFixed(2).replace('.', ',').split(',');
    arr[0] = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return arr.join(',').toString();
  }

  onNextStep(event) {
    this.nextStep.emit(event);
  }

  productLink(id: string): string {
    return `/produkt/${id}`;
  }

  removeProduct(id: string) {
    const index: number = this.products.findIndex(({ _id }) => _id === id);

    if (index !== -1) {
      this.products.splice(index, 1);
      this.cartService.removeProduct(id);
    }
  }
}
