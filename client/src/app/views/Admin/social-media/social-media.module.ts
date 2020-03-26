import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SocialMediaRoutingModule } from './social-media-routing.module';
import { SocialMediaComponent } from './social-media.component';

@NgModule({
  declarations: [SocialMediaComponent],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    SharedModule,
  ],
})
export class SocialMediaModule {}
