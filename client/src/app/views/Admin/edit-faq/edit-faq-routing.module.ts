import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditFAQComponent } from './edit-faq.component';
import { DashboardGuard } from '@guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: EditFAQComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFAQRoutingModule {}
