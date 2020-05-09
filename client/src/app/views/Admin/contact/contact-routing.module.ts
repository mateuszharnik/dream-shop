import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { DashboardGuard } from '@guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
