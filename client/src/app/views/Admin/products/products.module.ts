import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductShowcaseComponent } from '@components/product-showcase/product-showcase.component';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent, ProductShowcaseComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
  ],
})
export class ProductsModule { }
