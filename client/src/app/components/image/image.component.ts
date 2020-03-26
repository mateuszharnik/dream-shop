import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageComponent implements OnInit {
  @Input() imageClass = '';
  @Input() imageSrc: string = null;
  @Input() imageAltText: string = null;

  ngOnInit() {}
}
