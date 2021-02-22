import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { EditOrderRoutingModule } from './edit-order-routing.module';
import { EditOrderComponent } from './edit-order.component';

@NgModule({
  declarations: [EditOrderComponent],
  imports: [
    CommonModule,
    EditOrderRoutingModule,
    SharedModule,
  ],
})
export class EditOrderModule { }
