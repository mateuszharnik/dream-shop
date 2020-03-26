import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Fade } from '@animations/index';

interface Slide {
  img: string;
  href: string;
}

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
  currentIndex = 0;
  animationTime = 7000;
  images: Slide[] = [
    {
      img: '../../../assets/img/black-make-up-palette-and-brush-set-208052.jpg',
      href: 'produkty/bestesllery',
    },
    {
      img: '../../../assets/img/woman-carrying-tote-bags-975250.jpg',
      href: 'produkty/nowości',
    },
    {
      img: '../../../assets/img/assorted-blur-close-up-container-1115128.jpg',
      href: 'produkty/',
    },
  ];

  ngOnInit() {
    this.startSlide();
  }

  startSlide() {
    if (this.isFocus) { return; }

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
