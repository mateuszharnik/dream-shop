import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { checkRequiredProp } from '@helpers/validation';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageComponent implements OnInit, OnChanges {
  @Input() imageClass = '';
  @Input() imageSrc: string;
  @Input() imageAltText: string;

  ngOnInit() {
    this.checkAllRequiredProps();
  }

  ngOnChanges() {
    this.checkAllRequiredProps();
  }

  checkAllRequiredProps() {
    checkRequiredProp(this.imageSrc, 'imageSrc');
    checkRequiredProp(this.imageAltText, 'imageAltText');
  }
}
