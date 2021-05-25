import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import getRoute from '@helpers/router';
import { clientRoutes } from '@helpers/variables/routes';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: getRoute(clientRoutes.home),
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule { }
