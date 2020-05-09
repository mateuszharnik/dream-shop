import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
  ],
})
export class MessagesModule { }
