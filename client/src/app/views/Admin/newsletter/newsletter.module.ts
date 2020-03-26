import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NewsletterRoutingModule } from './newsletter-routing.module';
import { NewsletterComponent } from './newsletter.component';

@NgModule({
  declarations: [NewsletterComponent],
  imports: [
    CommonModule,
    NewsletterRoutingModule,
    SharedModule,
  ],
})
export class NewsletterModule {}
