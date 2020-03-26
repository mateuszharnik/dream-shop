import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { Contact } from '@models/index';

@Component({
  selector: 'app-footer-contact',
  templateUrl: './footer-contact.component.html',
  styleUrls: ['./footer-contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterContactComponent {
  @HostBinding('class.w-100') width = true;
  @Input() contact: Contact = null;
  @Output() whenLinkFocus: EventEmitter<any> = new EventEmitter<any>();

  onFocus(event: FocusEvent) {
    this.whenLinkFocus.emit(event);
  }

  computedPhone(phone: string): string {
    return `tel:${phone}`;
  }

  computedEmail(email: string): string {
    return `mailto:${email}`;
  }
}
