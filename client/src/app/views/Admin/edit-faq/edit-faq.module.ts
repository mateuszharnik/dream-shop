import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EditFAQRoutingModule } from './edit-faq-routing.module';
import { EditFAQComponent } from './edit-faq.component';

@NgModule({
  declarations: [EditFAQComponent],
  imports: [
    CommonModule,
    EditFAQRoutingModule,
    SharedModule,
  ],
})
export class EditFAQModule { }
