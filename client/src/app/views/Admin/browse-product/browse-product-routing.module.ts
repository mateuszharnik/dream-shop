import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseProductComponent } from './browse-product.component';
import { DashboardGuard } from '@guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: BrowseProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseProductRoutingModule {}
