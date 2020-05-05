import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Contact, Map } from '@models/index';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import { MapService } from '@services/map.service';
import { ContactService } from '@services/contact.service';

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
      this.isLoading = false;
      return this.toggleSpinner();
    }

    try {
      const mapResponse = await this.mapService.getData();
      const contactResponse = await this.contactService.getData();
      this.mapService.setMap(mapResponse);
      this.contactService.setContact(contactResponse);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
      this.toggleSpinner();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  checkContact(contact) {
    const address =
      contact.address &&
      (contact.address.street ||
        contact.address.street_number ||
        contact.address.zip_city ||
        contact.address.code);

    const result = contact && (address || contact.email || contact.phone || contact.working_hours || contact.nip);
    return result;
  }

  computedMailTo(email: string): string {
    return `mailto:${email}`;
  }

  computedTel(phone: string): string {
    return `tel:${phone}`;
  }
}
