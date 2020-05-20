import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Product } from '@models/index';
import { Slide } from '@animations/index';

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

  buttonText(): 'Mniej' | 'Więcej' {
    return this.isOpen ? 'Mniej' : 'Więcej';
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
