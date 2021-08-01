import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import { RegulationsComponent } from './regulations.component';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: RegulationsComponent,
  },
  {
    path: 'edytuj/:id',
    loadChildren:
      '@admin/edit-regulations/edit-regulations.module#EditRegulationsModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegulationsRoutingModule {}
