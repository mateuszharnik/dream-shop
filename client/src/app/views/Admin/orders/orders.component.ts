import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Alerts, DeleteResponse, Order, OrderWithPagination, Pagination } from '@models/index';
import { trackID } from '@helpers/index';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import { OrdersService } from '@services/orders.service';
import { WindowRefService } from '@services/window-ref.service';
import { AlertsService } from '@services/alerts.service';
import { OrdersModals } from '@models/modals';
import jump from 'jump.js';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild('deleteButton') deleteButton: any = null;
  @ViewChild('ordersWrapper') ordersWrapper: any = null;

  isLoading = true;
  isLoadingOrders = false;
  isDisabled = false;
  isSubmitted = false;
  listenerTime = 100;
  trackID = null;
  orders: Order[] = [];
  pagination: Pagination = null;
  throttleListener = null;
  debounceListener = null;
  windowEl: Window = null;
  modals: OrdersModals = {
    deleteOrders: [],
    deleteOrder: null,
  };
  subscriptions: Subscription[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private ordersService: OrdersService,
    private renderer: Renderer2,
    private alertsService: AlertsService,
    private windowRefService: WindowRefService,
  ) {
    this.trackID = trackID;

    this.windowEl = this.windowRefService.nativeWindow;
    this.throttleListener = this.renderer.listen(
      'window',
      'scroll',
      throttle(this.loadOrders, this.listenerTime),
    );
    this.debounceListener = this.renderer.listen(
      'window',
      'scroll',
      debounce(this.loadOrders, this.listenerTime),
    );

    this.subscriptions.push(
      this.ordersService.getOrders().subscribe((orders: Order[]) => {
        this.orders = orders;
      }),
    );

    this.subscriptions.push(
      this.alertsService.getAlert().subscribe((data: string) => {
        this.setAlerts('', '', data);
      }),
    );
  }

  async ngOnInit() {
    try {
      const response: OrderWithPagination = await this.ordersService.fetchOrders();
      this.pagination = response.pagination;
      this.ordersService.setOrders(response.orders);
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
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  editLink(id: string): string {
    return `edytuj/${id}`;
  }

  computedButtonTitle(): 'Usuń zamówienie' | 'Usuwanie zamówienia' {
    return this.isDisabled ? 'Usuwanie zamówienia' : 'Usuń zamówienie';
  }

  computedButtonText(): 'Usuń' | 'Usuwanie' {
    return this.isDisabled ? 'Usuwanie' : 'Usuń';
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

  loadOrders = async () => {
    if (!this.ordersWrapper) {
      return;
    }

    const rect: DOMRect = this.ordersWrapper.nativeElement.getBoundingClientRect();
    const shouldLoad: boolean = rect.bottom - 200 < this.windowEl.innerHeight;

    if (shouldLoad && !this.isLoadingOrders && this.pagination.remaining) {
      try {
        this.isLoadingOrders = true;

        const skip = this.pagination.skip + this.pagination.limit;

        const response: OrderWithPagination = await this.ordersService.fetchOrders(
          skip,
        );
        this.pagination = response.pagination;
        this.ordersService.setOrders([...this.orders, ...response.orders]);
      } catch (error) {
        if (error.status === 0 || error.status === 404) {
          this.setAlerts('Brak połączenia z serwerem.');
        } else {
          this.setAlerts('', error.error.message);
        }
      } finally {
        this.isLoadingOrders = false;
      }
    }
  }

  async deleteOrder(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const deletedOrder: Order = await this.ordersService.deleteOrder(id);
      const response: OrderWithPagination = await this.ordersService.fetchOrders();

      this.ordersService.setOrders(response.orders);
      this.setAlerts('', '', 'Pomyślnie usunięto zamówienie.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteOrder');
      this.isDisabled = false;
      this.isSubmitted = false;
      jump('.admin-page', {
        duration: 1000,
      });
    }
  }

  async deleteOrders() {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: DeleteResponse = await this.ordersService.deleteOrders();
      this.ordersService.setOrders([]);
      this.setAlerts('', '', 'Pomyślnie usunięto wszystkie zamówienia.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteOrders');
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  setFocus() {
    setTimeout(() => {
      this.deleteButton.button.nativeElement.focus();
    }, 50);
  }

  orderStatus(order: Order): 'Opłacono' | 'Odrzucono' | 'Wysłano' | 'Nie opłacono' {
    if (order.isAccepted) {
      return 'Wysłano';
    } else if (order.isRefused) {
      return 'Odrzucono';
    } else if (order.isPaid) {
      return 'Opłacono';
    } else {
      return 'Nie opłacono';
    }
  }

  openModal(order: Order) {
    if (this.modals.deleteOrder || this.modals.deleteOrders.length) {
      return;
    }

    if (order) {
      this.modals.deleteOrder = order;
    } else {
      this.modals.deleteOrders = this.orders;
    }
  }

  closeModal(key: 'deleteOrder' | 'deleteOrders') {
    if (key === 'deleteOrder') {
      this.modals.deleteOrder = null;
      return;
    }

    this.modals.deleteOrders = [];
  }
}
