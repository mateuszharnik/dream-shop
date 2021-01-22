import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Fade } from '@animations/index';
import { trackID } from '@helpers/index';
import { Slide } from '@models/index';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Fade],
})
export class SliderComponent implements OnInit, OnDestroy {
  interval = null;
  timeout = null;
  isFirst = true;
  isFocus = false;
  trackID = null;
  currentIndex = 0;
  animationTime = 7000;
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
      href: 'produkty/',
    },
  ];

  constructor() {
    this.trackID = trackID;
  }

  ngOnInit() {
    this.startSlide();
  }

  startSlide() {
    if (this.isFocus) {
      return;
    }

    this.interval = setInterval(() => {
      this.currentIndex++;

      if (this.currentIndex >= this.images.length) {
        this.isFirst = false;
        this.currentIndex = 0;
      }
    }, this.animationTime);
  }

  toggleFocus(isFocus: boolean) {
    this.isFocus = isFocus;
  }

  stopSlide() {
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    this.stopSlide();
  }
}
