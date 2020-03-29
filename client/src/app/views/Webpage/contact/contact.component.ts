import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Contact } from '@models/index';
import { SpinnerService } from '@services/spinner.service';
import { contact } from '@helpers/fakeAPI';

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
      this.contact = contact;
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
