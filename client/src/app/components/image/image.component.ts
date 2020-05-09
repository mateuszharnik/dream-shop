import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageComponent {
  @Input() imageClass = '';
  @Input() imageSrc: string = null;
  @Input() imageAltText: string = null;
}
