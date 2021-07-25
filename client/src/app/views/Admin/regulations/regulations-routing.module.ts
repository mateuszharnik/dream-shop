import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import getRoute from '@helpers/router';
import { clientRoutes } from '@helpers/variables/routes';
import { RegulationsComponent } from './regulations.component';

const routes: Routes = [
  {
    path: getRoute(clientRoutes.home),
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: RegulationsComponent,
  },
  {
    path: `${getRoute(clientRoutes.edit)}/:id`,
    loadChildren:
      '@admin/edit-regulations/edit-regulations.module#EditRegulationsModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegulationsRoutingModule {}
