import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import { BrowseProductComponent } from './browse-product.component';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: BrowseProductComponent,
  },
  {
    path: 'dodaj',
    loadChildren: '@admin/add-product/add-product.module#AddProductModule',
  },
  {
    path: 'kategorie',
    loadChildren: '@admin/add-product/add-product.module#AddProductModule',
  },
  {
    path: 'edytuj/:id',
    loadChildren: '@admin/edit-product/edit-product.module#EditProductModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseProductRoutingModule { }
