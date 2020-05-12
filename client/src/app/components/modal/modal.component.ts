import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  @ViewChild('button') button: any = null;

  @Output() whenButtonClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      this.button.button.nativeElement.focus();
    }, 50);
  }


  closeMenu() {
    this.whenButtonClick.emit();
  }
}
