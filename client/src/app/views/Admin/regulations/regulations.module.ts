import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RegulationsRoutingModule } from './regulations-routing.module';
import { RegulationsComponent } from './regulations.component';

@NgModule({
  declarations: [RegulationsComponent],
  imports: [CommonModule, RegulationsRoutingModule, SharedModule],
})
export class RegulationsModule {}
