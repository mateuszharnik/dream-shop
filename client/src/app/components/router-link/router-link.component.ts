import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { checkRequiredProp } from '@helpers/index';

@Component({
  selector: 'app-router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RouterLinkComponent implements OnInit, OnChanges {
  @Input() linkTitle = '';
  @Input() linkClass = '';
  @Input() linkRouter = '';
  @Input() linkOnClick = false;
  @Output() whenLinkClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.checkAllRequiredProp();
  }

  ngOnChanges() {
    this.checkAllRequiredProp();
  }

  onClick(event: Event) {
    this.whenLinkClick.emit(event);
  }

  checkAllRequiredProp() {
    checkRequiredProp(this.linkTitle, 'linkTitle');
    checkRequiredProp(this.linkRouter, 'linkRouter');
  }
}
