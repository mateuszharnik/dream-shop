import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CartSummaryComponent } from '@components/cart-summary/cart-summary.component';
import { PaymentMethodComponent } from '@components/payment-method/payment-method.component';
import { ProductsInCartComponent } from '@components/products-in-cart/products-in-cart.component';
import { CartFormComponent } from '@components/cart-form/cart-form.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CartComponent,
    ProductsInCartComponent,
    CartFormComponent,
    PaymentMethodComponent,
    CartSummaryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CartRoutingModule,
    SharedModule,
  ],
})
export class CartModule {}
