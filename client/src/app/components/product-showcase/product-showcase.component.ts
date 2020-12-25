import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Slide } from '@animations/index';
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

  productLink(id: string): string {
    return `/produkt/${id}`;
  }
}
