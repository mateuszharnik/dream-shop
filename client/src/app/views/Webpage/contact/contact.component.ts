import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Alerts, Contact, Map } from '@models/index';
import { ContactService } from '@services/contact.service';
import { MapService } from '@services/map.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit, OnDestroy {
  isLoading = true;
  contact: Contact = null;
  map: Map = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  modal = null;
  subscriptions: Subscription[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private mapService: MapService,
    private contactService: ContactService,
  ) {
    this.subscriptions.push(
      this.contactService.getContact().subscribe((data: Contact) => {
        this.contact = data;
      }),
    );

    this.subscriptions.push(
      this.mapService.getMap().subscribe((data: Map) => {
        this.map = data;
      }),
    );

    this.isLoading = this.map && this.contact ? false : true;
  }

  async ngOnInit() {
    if (this.map && this.contact) {
      this.setLoading();
    }

    try {
      const mapResponse: Map = await this.mapService.fetchMap();
      const contactResponse: Contact = await this.contactService.fetchContact();
      this.mapService.setMap(mapResponse);
      this.contactService.setContact(contactResponse);
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

  openModal() {
    if (this.modal) {
      return;
    }

    this.modal = true;
  }

  closeModal() {
    this.modal = false;
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  checkContact(contact: Contact): boolean {
    const address: boolean = !!(
      contact.address &&
      (contact.address.street ||
        contact.address.street_number ||
        contact.address.zip_code ||
        contact.address.city)
    );

    const result: boolean = !!(
      contact &&
      (address ||
        contact.email ||
        contact.phone ||
        contact.working_hours ||
        contact.nip)
    );
    return result;
  }

  computedMailTo(email: string): string {
    return `mailto:${email}`;
  }

  showMap(): boolean {
    return this.map && this.map.latlng !== '(00.00, 00.00)';
  }

  computedTel(phone: string): string {
    return `tel:${phone}`;
  }
}
