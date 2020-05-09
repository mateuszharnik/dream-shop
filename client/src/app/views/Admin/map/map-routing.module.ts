import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map.component';
import { DashboardGuard } from '@guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: MapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
