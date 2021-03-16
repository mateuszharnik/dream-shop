import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Alerts, Product, ProductWithPagination, Regulations } from '@models/index';
import { ModalService } from '@services/modal.service';
import { ProductsService } from '@services/products.service';
import { RegulationsService } from '@services/regulations.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  regulations: Regulations = null;
  subscriptions: Subscription[] = [];
  bestsellerProducts: Product[] = [];
  newProducts: Product[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private productsService: ProductsService,
    private regulationsService: RegulationsService,
    private modalService: ModalService,
  ) {
    this.subscriptions.push(
      this.regulationsService
        .getRegulations()
        .subscribe((data: Regulations[]) => {
          this.regulations = data.find(
            (value: Regulations) => value.name === 'newsletter',
          );
        }),
    );
  }

  async ngOnInit() {
    this.isLoading = true;

    try {
      const bestsellerResponse: ProductWithPagination = await this.productsService.fetchProducts({
        skip: 0,
        limit: 10,
        category: 'bestsellery',
      });
      const newResponse: ProductWithPagination = await this.productsService.fetchProducts({
        skip: 0,
        limit: 10,
      });
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  openModal() {
    this.modalService.openModal(this.regulations);
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }
}
