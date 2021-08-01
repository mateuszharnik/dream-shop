import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerts, Order } from '@models/index';
import { CartService } from '@services/cart.service';
import { OrdersService } from '@services/orders.service';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersComponent implements OnInit {
  isLoading = true;
  id = '';
  order: Order = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  constructor(
    private activateRoute: ActivatedRoute,
    private cartService: CartService,
    private spinnerService: SpinnerService,
    private ordersService: OrdersService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;

    this.cartService.removeContact();
    this.cartService.removeFullProducts();
    this.cartService.removeProducts();

    try {
      this.order = await this.ordersService.fetchOrder(this.id);

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

  async payOrder() {
    this.isLoading = true;

    try {
      this.order = await this.ordersService.paidOrder(this.id);
      this.setAlerts('', '', 'Pomyślnie opłacono.');

      this.isLoading = false;
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.isLoading = false;
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
