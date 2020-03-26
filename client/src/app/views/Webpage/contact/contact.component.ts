import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Contact } from '@models/index';
import { SpinnerService } from '@services/spinner.service';

const contactData: Contact = {
  id: '0',
  email: 'kontakt@dream.pl',
  phone: '+48 123 123 123',
  nip: '1234567890',
  adress: {
    street: 'Street',
    streetNumber: '7/21',
    city: 'City',
    code: '25-100',
  },
  workHours: '08:00 - 18:30',
};

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit {
  isLoading = true;
  contact: Contact = null;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    setTimeout(() => {
      this.contact = contactData;
      this.isLoading = false;
      this.toggleSpinner();
    }, 1000);
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  computedMailTo(email: string): string {
    return `mailto:${email}`;
  }

  computedTel(phone: string): string {
    return `tel:${phone}`;
  }
}
