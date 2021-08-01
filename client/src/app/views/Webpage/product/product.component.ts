import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event, Params } from '@angular/router';
import { Alerts, Product, ProductInCart } from '@models/index';
import { markdown } from '@helpers/index';
import { ProductsService } from '@services/products.service';
import { SpinnerService } from '@services/spinner.service';
import { ViewedProductsService } from '@services/viewed-products.service';
import { Subscription } from 'rxjs';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild('input') input: any = null;

  isLoading = true;
  totalQuantity = 0;
  productsInCart: ProductInCart[] = [];
  timeout = null;
  images: string[] = [];
  quantityError = false;
  viewedProducts: Product[] = [];
  product: Product = null;
  id: string = null;
  quantity = 1;
  subscriptions: Subscription[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService,
    private viewedProductsService: ViewedProductsService,
  ) {
    this.subscriptions.push(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.initState();
        }
      }),
    );

    this.subscriptions.push(
      this.cartService.getProducts().subscribe((products: ProductInCart[]) => {
        this.productsInCart = products;

        if (this.product && this.productsInCart.length) {
          const productInCart: ProductInCart = this.productsInCart.find(
            ({ _id }) => _id === this.product._id,
          );

          if (productInCart) {
            this.totalQuantity = this.product.quantity - productInCart.quantity;
          }
        }
      }),
    );

    this.subscriptions.push(
      this.viewedProductsService
        .getProducts()
        .subscribe((products: Product[]) => {
          this.viewedProducts = products;
        }),
    );

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params.id;
      }),
    );
  }

  ngOnInit() {
    this.initState();
  }

  async initState() {
    this.isLoading = true;

    try {
      const product: Product = await this.productsService.fetchProduct(this.id);
      const { products } = await this.productsService.fetchProductsInCart(
        this.viewedProducts,
      );

      if (products.length) {
        this.viewedProductsService.setProducts(products);
      } else {
        this.viewedProductsService.removeProducts();
      }

      this.product = {
        ...product,
        purify_description: product.purify_description
          ? markdown(product.purify_description)
          : '',
      };

      this.totalQuantity = product.quantity;

      if (this.product && this.productsInCart.length) {
        const productInCart: ProductInCart = this.productsInCart.find(({ _id }) => _id === this.product._id);

        if (productInCart) {
          this.totalQuantity = this.product.quantity - productInCart.quantity;
        }
      }

      this.images = [product.thumbnail, ...product.gallery];
      this.viewedProductsService.setProduct(this.product);
      this.setLoading();
    } catch (error) {
      if (error.status === 404 || error.status === 409) {
        this.router.navigate(['/404']);
        return;
      } else if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.setLoading();
    }
  }

  increaseQuantity() {
    if (this.quantity < (this.totalQuantity || 9999)) {
      this.quantity = this.quantity + 1;
      this.quantityError = false;
    } else {
      this.quantityError = true;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantityError = false;
      this.quantity = this.quantity - 1;
    }
  }

  changeQuantity(event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: number = Number(target.value);

    if (target.value.match(/^0+/)) {
      const newValue: number = Number(target.value.replace(/^0+/, ''));
      this.input.nativeElement.value = newValue;
      this.quantity = newValue;
      return;
    }

    if (value > this.product.quantity || value < 1) {
      this.input.nativeElement.value = this.quantity;
      return;
    }

    this.quantity = value;
  }

  addToCart() {
    this.cartService.setProducts({
      _id: this.product._id,
      quantity: this.quantity,
    });

    this.quantity = 1;
    this.quantityError = false;
    this.setAlerts('', '', 'Pomyślnie dodano do koszyka.');

    this.timeout = setTimeout(() => {
      this.setAlerts();
    }, 3000);
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }
}
