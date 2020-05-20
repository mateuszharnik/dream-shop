import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { markdown } from '@helpers/index';
import { Alerts, DeleteResponse, Product } from '@models/index';
import { ProductsModals } from '@models/modals';
import { AlertsService } from '@services/alerts.service';
import { ProductsService } from '@services/products.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import jump from 'jump.js';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('deleteButton') deleteButton: any = null;

  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  products: Product[] = [];
  subscriptions: Subscription[] = [];
  modals: ProductsModals = {
    deleteProducts: [],
    deleteProduct: null,
  };

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private alertsService: AlertsService,
    private productsService: ProductsService,
  ) {
    this.subscriptions.push(this.productsService.getProducts().subscribe((data: Product[]) => {
      this.products = data.length ? data.map((product: Product) => {
        product.description = markdown(product.description);
        return product;
      }) : data;
    }));

    this.subscriptions.push(this.alertsService.getAlert().subscribe((data: string) => {
      this.setAlerts('', '', data);
    }));
  }

  async ngOnInit() {
    try {
      const response: Product[] = await this.productsService.fetchProducts();
      this.productsService.setProducts(response);
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
      const response: Product = await this.productsService.deleteProduct(id);
      const products: Product[] = await this.productsService.fetchProducts();
      this.productsService.setProducts(products);
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
      jump('.admin-page', {
        duration: 1000,
      });
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
