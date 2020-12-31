import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Alerts, Product, ProductWithPagination } from '@models/index';
import { ProductsService } from '@services/products.service';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowcaseComponent implements OnInit {
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  bestsellerProducts: Product[] = [];
  newProducts: Product[] = [];

  constructor(private spinnerService: SpinnerService, private productsService: ProductsService) {}

  async ngOnInit() {
    this.isLoading = true;

    try {
      const bestsellerResponse: ProductWithPagination = await this.productsService.fetchProducts(
        0,
        10,
        'bestsellery',
      );
      const newResponse: ProductWithPagination = await this.productsService.fetchProducts(
        0,
        10,
      );
      this.newProducts = newResponse.products;
      this.bestsellerProducts = bestsellerResponse.products;
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

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }
}
