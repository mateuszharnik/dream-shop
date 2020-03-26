import { Component, EventEmitter, HostBinding, Output, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-footer-navigation',
  templateUrl: './footer-navigation.component.html',
  styleUrls: ['./footer-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterNavigationComponent {
  @HostBinding('class.w-100') width = true;
  @Output() whenLinkFocus: EventEmitter<any> = new EventEmitter<any>();
  @Output() whenLinkClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() onlyNavigationLinks: number;

  onFocus(event: FocusEvent) {
    this.whenLinkFocus.emit(event);
  }

  onClick(event: Event) {
    this.whenLinkClick.emit(event);
  }
}
