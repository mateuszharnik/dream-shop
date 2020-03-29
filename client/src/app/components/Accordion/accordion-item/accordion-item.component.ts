import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Slide } from '@animations/index';
import { FAQ as Accordion } from '@models/index';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Slide],
})
export class AccordionItemComponent implements OnInit {
  @Input() accordion: Accordion = null;

  isOpen = false;
  isDisabled = false;

  ngOnInit() {}

  toggleAccordion() {
    this.isDisabled = true;
    this.isOpen = !this.isOpen;

    setTimeout(() => {
      this.isDisabled = false;
    }, 400);
  }

  checkRequiredProp(prop: any, name: string) {
    if (!prop) {
      throw new Error(`Property "${name}" is required.`);
    }
  }

  computedID(name: string): string {
    return `${name}-${this.accordion.id}`;
  }

  computedAriaExpanded(): string {
    return `${this.isOpen}`;
  }

  computedTitle(): string {
    return this.isOpen ? 'Zamknij' : 'Otwórz';
  }
}
