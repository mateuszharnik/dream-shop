import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { checkRequiredProp, trackID } from '@helpers/index';
import { Alert } from '@models/index';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileInputComponent implements OnInit, OnChanges {
  @HostBinding('class.block') display = true;
  @HostBinding('class.w-100') width = true;
  @Input() inputAlerts: Alert[] = [];
  @Input() inputLabel: string = null;
  @Input() inputID: string = null;
  @Input() inputForm: AbstractControl = null;
  @Input() inputGroup: FormGroup = null;
  @Input() inputLabelClass = '';
  @Input() inputGroupClass = '';
  @Input() inputMessage = '';
  @Input() inputRequired = true;
  @Input() inputMultiple = false;
  @Input() inputValidation = false;
  @Input() inputFocus = false;
  @Output() whenFileAdd: EventEmitter<any> = new EventEmitter<any>();

  computedInputClass: string = null;
  computedAriaDescribedBy: string = null;
  computedSmallID: string = null;
  trackByID = null;

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

  computeAriaDescribedBy() {
    this.computedAriaDescribedBy = this.inputMessage
      ? `${this.inputID}Help`
      : null;
  }

  sendFileName(event) {
    this.whenFileAdd.emit(event.target.files);
  }

  computeSmallID() {
    this.computedSmallID = `${this.inputID}Help`;
  }

  computeAllProps() {
    this.computeAriaDescribedBy();
    this.computeSmallID();
  }

  checkAllRequiredProp() {
    checkRequiredProp(this.inputLabel, 'inputLabel');
    checkRequiredProp(this.inputID, 'inputID');
  }
}
