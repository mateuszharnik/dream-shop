import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { markdown, trackID } from '@helpers/index';
import { Alerts, DeleteResponse, Pagination, Product, ProductWithPagination } from '@models/index';
import { ProductsModals } from '@models/modals';
import { AlertsService } from '@services/alerts.service';
import { ProductsService } from '@services/products.service';
import { SpinnerService } from '@services/spinner.service';
import { WindowRefService } from '@services/window-ref.service';
import { Subscription } from 'rxjs';
import jump from 'jump.js';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('deleteButton') deleteButton: any = null;
  @ViewChild('productsWrapper') productsWrapper: any = null;

  isLoading = true;
  isLoadingProducts = false;
  isDisabled = false;
  isSubmitted = false;
  products: Product[] = [];
  pagination: Pagination = null;
  subscriptions: Subscription[] = [];
  listenerTime = 100;
  trackID = null;
  throttleListener = null;
  debounceListener = null;
  windowEl: Window = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  modals: ProductsModals = {
    deleteProducts: [],
    deleteProduct: null,
  };

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private alertsService: AlertsService,
    private productsService: ProductsService,
    private renderer: Renderer2,
    private windowRefService: WindowRefService,
  ) {
    this.trackID = trackID;

    this.subscriptions.push(this.productsService.getProducts().subscribe((data: Product[]) => {
      this.products = data.length ? data.map((product: Product) => {
        product.description = markdown(product.description);
        return product;
      }) : data;
    }));

    this.subscriptions.push(this.alertsService.getAlert().subscribe((data: string) => {
      this.setAlerts('', '', data);
    }));

    this.windowEl = this.windowRefService.nativeWindow;
    this.throttleListener = this.renderer.listen('window', 'scroll', throttle(this.loadProducts, this.listenerTime));
    this.debounceListener = this.renderer.listen('window', 'scroll', debounce(this.loadProducts, this.listenerTime));
  }

  async ngOnInit() {
    try {
      const response: ProductWithPagination = await this.productsService.fetchProducts();
      this.pagination = response.pagination;
      this.productsService.setProducts(response.products);
      this.setLoading();
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.setLoading();
    }
  }

  ngOnDestroy() {
    if (this.throttleListener) {
      this.throttleListener();
    }

    if (this.debounceListener) {
      this.debounceListener();
    }

    this.alertsService.setAlert('');
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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

  buttonTitle(value: boolean): 'Usuń produkt' | 'Usuwanie produktu' {
    return value ? 'Usuwanie produktu' : 'Usuń produkt';
  }

  buttonText(value: boolean): 'Usuń' | 'Usuwanie' {
    return value ? 'Usuwanie' : 'Usuń';
  }

  editLink(id: string): string {
    return `edytuj/${id}`;
  }

  async deleteProduct(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const deletedProduct: Product = await this.productsService.deleteProduct(id);
      const response: ProductWithPagination = await this.productsService.fetchProducts();
      this.productsService.setProducts(response.products);
      this.setAlerts('', '', 'Pomyślnie usunięto produkt.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteProduct');
      this.isDisabled = false;
      this.isSubmitted = false;
      jump('.admin-page-section', {
        duration: 1000,
      });
    }
  }

  loadProducts = async () => {
    if (!this.productsWrapper) {
      return;
    }

    const rect = this.productsWrapper.nativeElement.getBoundingClientRect();
    const shouldLoad = rect.bottom - 200 < this.windowEl.innerHeight;

    if (shouldLoad && !this.isLoadingProducts && this.pagination.remaining) {
      try {
        this.isLoadingProducts = true;
        const skip = this.pagination.skip + this.pagination.limit;
        const response: ProductWithPagination = await this.productsService.fetchProducts({ skip });
        this.pagination = response.pagination;
        this.productsService.setProducts([
          ...this.products,
          ...response.products,
        ]);
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

  async deleteProducts() {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: DeleteResponse = await this.productsService.deleteProducts();
      this.productsService.setProducts([]);
      this.setAlerts('', '', `Pomyślnie usunięto wszystkie produkty.`);
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteProducts');
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  openModal(product: Product) {
    if (this.modals.deleteProduct || this.modals.deleteProducts.length) {
      return;
    }

    if (product) {
      this.modals.deleteProduct = product;
    } else {
      this.modals.deleteProducts = this.products;
    }
  }

  closeModal(key: 'deleteProduct' | 'deleteProducts') {
    if (key === 'deleteProduct') {
      this.modals.deleteProduct = null;
      return;
    }

    this.modals.deleteProducts = [];
  }
}
