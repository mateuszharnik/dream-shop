import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from '@components/contact-form/contact-form.component';
import { SharedModule } from '@shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent, ContactFormComponent],
  imports: [CommonModule, ContactRoutingModule, ReactiveFormsModule, FormsModule, SharedModule],
})
export class ContactModule {}
