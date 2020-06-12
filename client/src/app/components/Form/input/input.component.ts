import { Component, HostBinding, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { checkRequiredProp, trackID } from '@helpers/index';
import { Alert } from '@models/index';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements OnInit, OnChanges {
  @HostBinding('class.block') display = true;
  @HostBinding('class.w-100') width = true;
  @Input() inputAlerts: Alert[] = [];
  @Input() inputForm: AbstractControl = null;
  @Input() inputGroup: FormGroup = null;
  @Input() inputLabel: string = null;
  @Input() inputID: string = null;
  @Input() inputType: 'text' | 'password' | 'email' = 'text';
  @Input() inputClass = 'form__input';
  @Input() inputLabelClass = '';
  @Input() inputGroupClass = '';
  @Input() inputMessage = '';
  @Input() inputPlaceholder = '';
  @Input() inputRequired = true;
  @Input() inputFocus = false;
  @Input() inputValidation = false;

  trackID = null;
  computedInputClass: string = null;
  computedAriaDescribedBy: string = null;
  computedSmallID: string = null;

  constructor() {
    this.trackID = trackID;
  }

  ngOnInit() {
    this.checkAllRequiredProp();
    this.computeAllProps();
  }

  ngOnChanges() {
    this.checkAllRequiredProp();
    this.computeAllProps();
  }

  computeInputClass() {
    this.computedInputClass = `${this.inputClass} ${
      this.inputValidation ? 'invalid' : ''
      }`;
  }

  computeAriaDescribedBy() {
    this.computedAriaDescribedBy = this.inputMessage
      ? `${this.inputID}Help`
      : null;
  }

  computeSmallID() {
    this.computedSmallID = `${this.inputID}Help`;
  }

  computeAllProps() {
    this.computeInputClass();
    this.computeAriaDescribedBy();
    this.computeSmallID();
  }

  checkAllRequiredProp() {
    checkRequiredProp(this.inputForm, 'inputForm');
    checkRequiredProp(this.inputGroup, 'inputGroup');
    checkRequiredProp(this.inputLabel, 'inputLabel');
    checkRequiredProp(this.inputID, 'inputID');
  }
}
