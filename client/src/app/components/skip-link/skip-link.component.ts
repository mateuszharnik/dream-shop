import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-skip-link',
  templateUrl: './skip-link.component.html',
  styleUrls: ['./skip-link.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SkipLinkComponent {
  @Output() whenSkipNavigation: EventEmitter<any> = new EventEmitter<any>();

  skipNavigation(event: Event) {
    event.preventDefault();
    this.whenSkipNavigation.emit(event);
  }
}
