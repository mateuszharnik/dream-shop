import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFAQComponent } from './add-faq.component';

const routes: Routes = [
  {
    path: '',
    component: AddFAQComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFAQRoutingModule { }
