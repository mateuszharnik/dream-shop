import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { trackID } from '@helpers/index';
import { Alert } from '@models/index';

@Component({
  selector: 'app-terms-checkbox',
  templateUrl: './terms-checkbox.component.html',
  styleUrls: ['./terms-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TermsCheckboxComponent {
  @HostBinding('class.inline-block') display = true;
  @Input() checkboxAlerts: Alert[] = [];
  @Input() checkboxForm: AbstractControl = null;
  @Input() checkboxGroup: FormGroup = null;
  @Input() checkboxID: string = null;
  @Input() checkboxLabelClass = '';
  @Input() checkboxGroupClass = 'text-center';
  @Input() checkboxMessage = '';
  @Input() checkboxRequired = true;
  @Input() checkboxFocus = false;
  @Input() checkboxValidation = false;
  @Output() whenClickEnter: EventEmitter<any> = new EventEmitter<any>();
  @Output() whenClickLink: EventEmitter<any> = new EventEmitter<any>();

  trackID = null;

  constructor() {
    this.trackID = trackID;
  }

  getCheckboxClass(): string {
    return `form__checkbox ${this.checkboxValidation ? 'invalid' : ''}`;
  }

  getAriaDescribedBy(): string {
    return this.checkboxMessage ? `${this.checkboxID}Help` : null;
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

  onLinkClick(event) {
    event.preventDefault();
    this.whenClickLink.emit(event);
  }

  getSmallID() {
    return `${this.checkboxID}Help`;
  }
}
