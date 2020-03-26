import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent implements OnInit {
  @Input() accordions: Accordion[] = [];
  @HostBinding('class.w-100') width = true;

  ngOnInit() {}

  trackID(index: string, item: any): string {
    return item.id;
  }

  checkRequiredProp(prop: any, name: string) {
    if (!prop) {
      throw new Error(`Property "${name}" is required.`);
    }
  }
}

interface Accordion {
  id: string;
  title: string;
  content: string;
}
