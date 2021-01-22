import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageWrapperComponent {
  @Input() className: string;
}
