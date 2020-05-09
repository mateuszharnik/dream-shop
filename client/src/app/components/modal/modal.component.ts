import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  @Output() whenButtonClick: EventEmitter<any> = new EventEmitter<any>();

  closeMenu() {
    this.whenButtonClick.emit();
  }
}
