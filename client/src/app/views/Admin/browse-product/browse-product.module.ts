import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BrowseProductRoutingModule } from './browse-product-routing.module';
import { BrowseProductComponent } from './browse-product.component';

@NgModule({
  declarations: [BrowseProductComponent],
  imports: [
    CommonModule,
    BrowseProductRoutingModule,
    SharedModule,
  ],
})
export class BrowseProductModule { }
