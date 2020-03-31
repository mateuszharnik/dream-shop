import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditFAQComponent } from './edit-faq.component';

const routes: Routes = [
  {
    path: '',
    component: EditFAQComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFAQRoutingModule {}
