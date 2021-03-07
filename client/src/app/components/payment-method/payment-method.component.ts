import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentMethodComponent {
  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();
  @Output() prevStep: EventEmitter<any> = new EventEmitter<any>();

  onNextStep(event) {
    this.nextStep.emit(event);
  }

  onPrevStep(event) {
    this.prevStep.emit(event);
  }
}
