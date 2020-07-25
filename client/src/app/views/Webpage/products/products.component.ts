import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, Params } from '@angular/router';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '@services/products.service';
import { Alerts, ProductWithPagination } from '@models/index';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit, OnDestroy {
  isLoading = true;
  subscriptions: Subscription[] = [];
  id = '';
  products: ProductWithPagination = null;
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
  ) {
    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initState();
      }
    }));

    this.subscriptions.push(this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
    }));
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
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  async initState() {
    this.isLoading = true;

    try {
      this.products = await this.productsService.fetchProducts(0, 20, this.id);
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
}
