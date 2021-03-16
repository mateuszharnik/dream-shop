import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { trackID } from '@helpers/index';
import { Alert } from '@models/index';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RadioComponent implements OnInit, OnChanges {
  @HostBinding('class.block') display = true;
  @HostBinding('class.w-100') width = true;
  @Input() radioAlerts: Alert[] = [];
  @Input() radioForm: AbstractControl = null;
  @Input() radioGroup: FormGroup = null;
  @Input() radioLabel: string = null;
  @Input() radioID: string = null;
  @Input() radioLabelClass = '';
  @Input() radioName = '';
  @Input() radioGroupClass = 'text-center';
  @Input() radioMessage = '';
  @Input() radioRequired = true;
  @Input() radioFocus = false;
  @Input() radioValidation = false;
  @Output() whenClickEnter: EventEmitter<any> = new EventEmitter<any>();

  trackID = null;

  constructor() {
    this.trackID = trackID;
  }

  ngOnInit() {}

  ngOnChanges() {}

  getRadioClass(): string {
    return `form__radio ${this.radioValidation ? 'invalid' : ''}`;
  }

  getAriaDescribedBy(): string {
    return this.radioMessage ? `${this.radioID}Help` : null;
  }

  getRadioLabelClass(): string {
    return `form__radio--label ${this.radioLabelClass}`;
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.whenClickEnter.emit(event);
    }
  }

  getSmallID() {
    return `${this.radioID}Help`;
  }
}
