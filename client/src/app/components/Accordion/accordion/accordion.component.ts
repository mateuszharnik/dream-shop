import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { FAQ } from '@models/index';
import { trackID } from '@helpers/index';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent {
  @Input() faqs: FAQ[] = [];
  @HostBinding('class.w-100') width = true;

  trackID = null;

  constructor() {
    this.trackID = trackID;
  }

  checkRequiredProp(prop: any, name: string) {
    if (!prop) {
      throw new Error(`Property "${name}" is required.`);
    }
  }
}
