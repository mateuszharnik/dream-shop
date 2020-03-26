import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HamburgerButtonComponent {
  @Input() isOpen = false;
  @Input() isDisabled = false;
  @Output() whenHamburgerButtonClick: EventEmitter<any> = new EventEmitter<any>();

  toggle() {
    this.whenHamburgerButtonClick.emit();
  }

  computedHamburgerTitle(): 'Zamknij menu' | 'Otwórz menu' {
    return this.isOpen ? 'Zamknij menu' : 'Otwórz menu';
  }

  computedAriaExpanded(): string {
    return `${this.isOpen}`;
  }
}
