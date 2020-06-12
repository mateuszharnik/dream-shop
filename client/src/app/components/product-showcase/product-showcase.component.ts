import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Slide } from '@animations/index';
import { trackID } from '@helpers/index';
import { Product } from '@models/index';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [Slide],
})
export class ProductShowcaseComponent {
  @Input() product: Product = null;

  isOpen = false;
  isAnimated = false;
  loadedImages = 0;
  imagesLoaded = false;
  trackID = null;

  constructor() {
    this.trackID = trackID;
  }

  buttonText(): 'Mniej' | 'Więcej' {
    return this.isOpen ? 'Mniej' : 'Więcej';
  }

  imageLoaded() {
    setTimeout(() => {
      if (this.loadedImages !== this.product.gallery.length) {
        this.loadedImages += 1;
      }

      if (this.loadedImages === this.product.gallery.length) {
        this.imagesLoaded = true;
      }
    }, 450);
  }

  buttonTitle(): 'Pokaż mniej' | 'Pokaż więcej' {
    return this.isOpen ? 'Pokaż mniej' : 'Pokaż więcej';
  }

  toggleDescription() {
    this.isAnimated = true;
    this.isOpen = !this.isOpen;

    setTimeout(() => {
      this.isAnimated = false;
    }, 450);
  }
}
