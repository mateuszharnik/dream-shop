import { Component, OnInit, HostBinding, Input, ViewEncapsulation, OnChanges, Output, EventEmitter } from '@angular/core';
import { checkRequiredProp } from '@helpers/index';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileInputComponent implements OnInit, OnChanges {
  @HostBinding('class.block') display = true;
  @HostBinding('class.w-100') width = true;
  @Input() inputLabel: string = null;
  @Input() inputID: string = null;
  @Input() inputLabelClass = '';
  @Input() inputGroupClass = '';
  @Input() inputMessage = '';
  @Input() inputRequired = true;
  @Input() inputFocus = false;
  @Output() whenFileAdd: EventEmitter<any> = new EventEmitter<any>();

  computedInputClass: string = null;
  computedAriaDescribedBy: string = null;
  computedSmallID: string = null;

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
