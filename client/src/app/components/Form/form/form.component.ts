import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { checkRequiredProp } from '@helpers/index';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit, OnChanges {
  @Input() formName: FormGroup = null;
  @Input() formClass = '';
  @Input() formMethod: 'POST'| 'GET' = 'POST';
  @Output() whenFormSubmit: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.checkAllRequiredProp();
  }

  ngOnChanges() {
    this.checkAllRequiredProp();
  }

  onSubmit(event: Event) {
    this.whenFormSubmit.emit(event);
  }

  checkAllRequiredProp() {
    checkRequiredProp(this.formName, 'formName');
  }
}
