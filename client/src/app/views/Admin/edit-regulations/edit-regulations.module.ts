import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { EditRegulationsRoutingModule } from './edit-regulations-routing.module';
import { EditRegulationsComponent } from './edit-regulations.component';

@NgModule({
  declarations: [EditRegulationsComponent],
  imports: [CommonModule, EditRegulationsRoutingModule, SharedModule],
})
export class EditRegulationsModule {}
