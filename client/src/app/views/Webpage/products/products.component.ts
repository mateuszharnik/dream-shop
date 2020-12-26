import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Params,
  Router,
} from '@angular/router';
import { trackID } from '@helpers/index';
import {
  Alerts,
  Pagination,
  Product,
  ProductCategory,
  ProductWithPagination,
} from '@models/index';
import { ProductsService } from '@services/products.service';
import { SpinnerService } from '@services/spinner.service';
import { WindowRefService } from '@services/window-ref.service';
import { Subscription } from 'rxjs';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('productsWrapper') productsWrapper: any = null;

  pagination: Pagination = null;
  isLoadingProducts = false;
  isLoading = true;
  subscriptions: Subscription[] = [];
  id = '';
  trackID = null;
  windowEl: Window = null;
  categories: ProductCategory[] = [];
  products: Product[] = [];
  listenerTime = 100;
  throttleListener = null;
  debounceListener = null;
  search = '';
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private productsService: ProductsService,
    private renderer: Renderer2,
    private windowRefService: WindowRefService,
  ) {
    this.trackID = trackID;
    this.windowEl = this.windowRefService.nativeWindow;

    this.subscriptions.push(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.initState();
        }
      }),
    );

    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.search = params.search;
      }),
    );

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params.id;
      }),
    );

    this.throttleListener = this.renderer.listen(
      'window',
      'scroll',
      throttle(this.loadProducts, this.listenerTime),
    );
    this.debounceListener = this.renderer.listen(
      'window',
      'scroll',
      debounce(this.loadProducts, this.listenerTime),
    );
  }

  ngOnInit() {
    this.initState();
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
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  async initState() {
    this.isLoading = true;

    try {
      const response: ProductWithPagination = await this.productsService.fetchProducts(
        0,
        12,
        this.id,
        this.search,
      );
      this.categories = await this.productsService.fetchProductCategories();
      this.pagination = response.pagination;
      this.products = response.products;
      this.setLoading();
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.setLoading();
    }
  }

  loadProducts = async () => {
    if (!this.productsWrapper) {
      return;
    }

    const rect: DOMRect = this.productsWrapper.nativeElement.getBoundingClientRect();
    const shouldLoad: boolean = rect.bottom - 200 < this.windowEl.innerHeight;

    if (shouldLoad && !this.isLoadingProducts && this.pagination.remaining) {
      try {
        this.isLoadingProducts = true;

        const skip: number = this.pagination.skip + this.pagination.limit;
        const response: ProductWithPagination = await this.productsService.fetchProducts(
          skip,
          12,
          this.id,
          this.search,
        );

        this.pagination = response.pagination;
        this.products = [...this.products, ...response.products];
      } catch (error) {
        if (error.status === 0 || error.status === 404) {
          this.setAlerts('Brak połączenia z serwerem.');
        } else {
          this.setAlerts('', error.error.message);
        }
      } finally {
        this.isLoadingProducts = false;
      }
    }
  }
}
