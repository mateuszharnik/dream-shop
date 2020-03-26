import { Component, HostBinding, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { checkRequiredProp, trackID } from '@helpers/index';
import { Alert } from '@models/index';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextareaComponent implements OnInit, OnChanges {
  @HostBinding('class.block') display = true;
  @HostBinding('class.w-100') width = true;
  @Input() textareaAlerts: Alert[] = [];
  @Input() textareaForm: AbstractControl = null;
  @Input() textareaGroup: FormGroup = null;
  @Input() textareaLabel: string = null;
  @Input() textareaID: string = null;
  @Input() textareaClass = 'form__textarea';
  @Input() textareaLabelClass = '';
  @Input() textareaGroupClass = '';
  @Input() textareaMessage = '';
  @Input() textareaPlaceholder = '';
  @Input() textareaRows = '6';
  @Input() textareaCols = '60';
  @Input() textareaRequired = true;
  @Input() textareaFocus = false;
  @Input() textareaValidation = false;

  trackByID = null;
  computedTextareaClass: string = null;
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

  computeTextareaClass() {
    this.computedTextareaClass = `${this.textareaClass} ${
      this.textareaValidation ? 'invalid' : ''
    }`;
  }

  computeAriaDescribedBy() {
    this.computedAriaDescribedBy = this.textareaMessage
      ? `${this.textareaID}Help`
      : null;
  }

  computeSmallID() {
    this.computedSmallID = `${this.textareaID}Help`;
  }

  computeAllProps() {
    this.computeTextareaClass();
    this.computeAriaDescribedBy();
    this.computeSmallID();
  }

  checkAllRequiredProp() {
    checkRequiredProp(this.textareaForm, 'textareaForm');
    checkRequiredProp(this.textareaGroup, 'textareaGroup');
    checkRequiredProp(this.textareaLabel, 'textareaLabel');
    checkRequiredProp(this.textareaID, 'textareaID');
  }
}
