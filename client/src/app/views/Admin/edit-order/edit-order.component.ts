import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerts, Order, OrderWithPagination } from '@models/index';
import { AlertsService } from '@services/alerts.service';
import { OrdersService } from '@services/orders.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditOrderComponent implements OnInit, OnDestroy {
  isLoading = true;
  isDisabled = false;
  isRefused = false;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  modal = false;
  id: string = null;
  isSubmitted = false;
  subscriptions: Subscription[] = [];
  order: Order = null;

  constructor(
    private spinnerService: SpinnerService,
    private alertsService: AlertsService,
    private activateRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;

    try {
      this.order = await this.ordersService.fetchOrder(this.id);
      this.setLoading();
    } catch (error) {
      if (error.status === 404) {
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

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  buttonText(value: boolean): 'Anulowanie' | 'Anuluj' | 'Akceptowanie' | 'Zaakceptuj' {
    if (this.isRefused) {
      return value ? 'Anulowanie' : 'Anuluj';
    } else {
      return value ? 'Akceptowanie' : 'Zaakceptuj';
    }
  }

  buttonTitle(
    value: boolean,
  ):
    | 'Anulowanie zamówienia'
    | 'Anuluj zamówienie'
    | 'Akceptowanie i wysyłanie zamówienia'
    | 'Akceptuj i wyślij zamówienie' {
    if (this.isRefused) {
      return value ? 'Anulowanie zamówienia' : 'Anuluj zamówienie';
    } else {
      return value
        ? 'Akceptowanie i wysyłanie zamówienia'
        : 'Akceptuj i wyślij zamówienie';
    }
  }

  buttonClass(): string {
    return `button button-small button-${this.isRefused ? 'danger' : 'success'}`;
  }

  acceptButtonClass(): string {
    return `button button-success button-small ${!this.order.refused ? 'sm:mr-4 mb-2 sm:mb-0' : ''}`;
  }

  openModal(refused = false) {
    if (this.modal) {
      return;
    }

    this.isRefused = refused;
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  async updateOrder() {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      await this.ordersService.updateOrder(this.id, this.isRefused);

      const response: OrderWithPagination = await this.ordersService.fetchOrders();

      this.ordersService.setOrders(response.orders);
      this.router.navigate(['/admin/zamowienia']);

      const alert: string = this.isRefused
        ? 'Pomyślnie oznaczono zamówienie jako odrzucone.'
        : 'Pomyślnie oznaczono zamówienie jako wysłane.';

      this.alertsService.setAlert(alert);
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.closeModal();
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }
}
