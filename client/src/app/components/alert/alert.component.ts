import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AlertClassType } from '@models/alerts';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent {
  @Input() alertClassType: AlertClassType = 'danger';
  @Input() alertClass = '';

  getClass(): string {
    let alert = `alert alert-${this.alertClassType}`;

    if (this.alertClass) {
      alert += ` ${this.alertClass}`;
    }

    return alert;
  }
}
