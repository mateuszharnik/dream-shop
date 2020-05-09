import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFAQComponent } from './add-faq.component';
import { DashboardGuard } from '@guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: AddFAQComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFAQRoutingModule { }
