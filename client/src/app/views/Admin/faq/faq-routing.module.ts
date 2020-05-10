import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import { FAQComponent } from './faq.component';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: FAQComponent,
  },
  {
    path: 'dodaj',
    loadChildren: '@admin/add-faq/add-faq.module#AddFAQModule',
  },
  {
    path: 'edytuj/:id',
    loadChildren: '@admin/edit-faq/edit-faq.module#EditFAQModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FAQRoutingModule { }
