import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductCategoriesRoutingModule } from './product-categories-routing.module';
import { ProductCategoriesComponent } from './product-categories.component';

@NgModule({
  declarations: [ProductCategoriesComponent],
  imports: [
    CommonModule,
    ProductCategoriesRoutingModule,
    SharedModule,
  ],
})
export class ProductCategoriesModule { }
