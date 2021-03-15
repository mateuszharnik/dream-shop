import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ViewedProductsComponent } from '@components/viewed-products/viewed-products.component';
import { CommentsComponent } from '@components/comments/comments.component';
import { ProductImagesComponent } from '@components/product-images/product-images.component';
import { ViewedProductsService } from '@services/viewed-products.service';
import { CommentsService } from '@services/comments.service';
import { SwiperModule } from 'swiper/angular';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [
    ProductComponent,
    ViewedProductsComponent,
    CommentsComponent,
    ProductImagesComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, SharedModule, SwiperModule],
  providers: [ViewedProductsService, CommentsService],
})
export class ProductModule {}
