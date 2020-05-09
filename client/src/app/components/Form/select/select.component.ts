import { Component, HostBinding, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { checkRequiredProp, trackID } from '@helpers/index';
import { Alert } from '@models/index';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent implements OnInit, OnChanges {
  @HostBinding('class.block') display = true;
  @HostBinding('class.w-100') width = true;
  @Input() selectAlerts: Alert[] = [];
  @Input() selectForm: AbstractControl = null;
  @Input() selectGroup: FormGroup = null;
  @Input() selectLabel: string = null;
  @Input() selectID: string = null;
  @Input() selectBy: string = null;
  @Input() selectOptions: [] = [];
  @Input() selectClass = 'form__select';
  @Input() selectLabelClass = '';
  @Input() selectGroupClass = '';
  @Input() selectMessage = '';
  @Input() selectRequired = true;
  @Input() selectFocus = false;
  @Input() selectValidation = false;

  trackByID = null;
  computedSelectClass: string = null;
  computedAriaDescribedBy: string = null;
  computedSmallID: string = null;

  constructor() {
    this.trackByID = trackID;
  }

  ngOnInit() {
    this.checkAllRequiredProp();
    this.computeAllProps();
  }

  ngOnChanges() {
    this.checkAllRequiredProp();
    this.computeAllProps();
  }

  computeSelectClass() {
    this.computedSelectClass = `${this.selectClass} ${
      this.selectValidation ? 'invalid' : ''
      }`;
  }

  computeAriaDescribedBy() {
    this.computedAriaDescribedBy = this.selectMessage
      ? `${this.selectID}Help`
      : null;
  }

  computeSmallID() {
    this.computedSmallID = `${this.selectID}Help`;
  }

  computeAllProps() {
    this.computeSelectClass();
    this.computeAriaDescribedBy();
    this.computeSmallID();
  }

  checkAllRequiredProp() {
    checkRequiredProp(this.selectForm, 'selectForm');
    checkRequiredProp(this.selectGroup, 'selectGroup');
    checkRequiredProp(this.selectLabel, 'selectLabel');
    checkRequiredProp(this.selectID, 'selectID');
    checkRequiredProp(this.selectOptions, 'selectOptions');
    checkRequiredProp(this.selectBy, 'selectBy');
  }
}
