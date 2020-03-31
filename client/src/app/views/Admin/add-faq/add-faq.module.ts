import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AddFAQRoutingModule } from './add-faq-routing.module';
import { AddFAQComponent } from './add-faq.component';

@NgModule({
  declarations: [AddFAQComponent],
  imports: [
    CommonModule,
    AddFAQRoutingModule,
    SharedModule,
  ],
})
export class AddFAQModule {}
