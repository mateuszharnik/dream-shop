import { Component, ViewEncapsulation } from '@angular/core';
import { trackID } from '@helpers/index';
import { Slide } from '@models/index';
import { SwiperOptions } from 'swiper/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {
  trackID = null;
  config: SwiperOptions = {
    effect: 'fade',
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 10000,
    },
  };
  images: Slide[] = [
    {
      img: '../../../assets/img/black-make-up-palette-and-brush-set-208052.jpg',
      href: 'produkty/bestsellery',
    },
    {
      img: '../../../assets/img/woman-carrying-tote-bags-975250.jpg',
      href: 'produkty/nowosci',
    },
    {
      img: '../../../assets/img/assorted-blur-close-up-container-1115128.jpg',
      href: 'produkty/wszystkie',
    },
  ];

  constructor() {
    this.trackID = trackID;
  }

  computedImageSrc(image: string): string {
    return `url(${image})`;
  }
}
