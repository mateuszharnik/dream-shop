import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { trackID } from '@helpers/index';
import { Alert } from '@models/index';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, OnChanges {
  @HostBinding('class.block') display = true;
  @HostBinding('class.w-100') width = true;
  @Input() checkboxAlerts: Alert[] = [];
  @Input() checkboxForm: AbstractControl = null;
  @Input() checkboxGroup: FormGroup = null;
  @Input() checkboxLabel: string = null;
  @Input() checkboxID: string = null;
  @Input() checkboxLabelClass = '';
  @Input() checkboxGroupClass = 'text-center';
  @Input() checkboxMessage = '';
  @Input() checkboxRequired = true;
  @Input() checkboxFocus = false;
  @Input() checkboxValidation = false;
  @Output() whenClickEnter: EventEmitter<any> = new EventEmitter<any>();

  trackByID = null;

  constructor() {
    this.trackByID = trackID;
  }

  ngOnInit() { }

  ngOnChanges() { }

  getCheckboxClass(): string {
    return `form__checkbox ${
      this.checkboxValidation ? 'invalid' : ''
      }`;
  }

  getAriaDescribedBy(): string {
    return this.checkboxMessage
      ? `${this.checkboxID}Help`
      : null;
  }

  getCheckboxLabelClass(): string {
    return `form__checkbox--label ${this.checkboxLabelClass}`;
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.whenClickEnter.emit(event);
    }
  }

  getSmallID() {
    return `${this.checkboxID}Help`;
  }
}
