import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Alerts, Order } from '@models/index';
import { OrdersService } from '@services/orders.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit, OnDestroy {
  isLoading = true;
  isSubmitted = false;
  currentStep = 1;
  subscriptions: Subscription[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  constructor(
    private spinnerService: SpinnerService,
    private orderService: OrdersService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.setLoading();
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

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  setCurrentStep(currentStep: number) {
    if (currentStep < 1 || currentStep > 4) {
      return;
    }

    this.currentStep = currentStep;
  }

  async sendOrder(data: Order) {
    this.isSubmitted = true;

    try {
      const order: Order = await this.orderService.saveOrder(data);

      this.router.navigate([`/zamowienia/${order._id}`]);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.isSubmitted = false;
    }
  }
}
