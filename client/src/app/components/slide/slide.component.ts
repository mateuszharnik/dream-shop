import { Component, ViewEncapsulation, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Slide } from '@models/index';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SlideComponent {
  @HostBinding('class.h-100') height = true;
  @Input() slide: Slide = null;
  @Output() whenStopSlide: EventEmitter<any> = new EventEmitter<any>();
  @Output() whenStartSlide: EventEmitter<any> = new EventEmitter<any>();
  @Output() whenIsFocus: EventEmitter<any> = new EventEmitter<any>();

  computedImageSrc(image: string): string {
    return `url(${image})`;
  }

  startSlide() {
    this.whenIsFocus.emit(false);
    this.whenStartSlide.emit();
  }

  stopSlide() {
    this.whenIsFocus.emit(true);
    this.whenStopSlide.emit();
  }
}
