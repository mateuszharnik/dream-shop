import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: ProductsComponent,
  },
  {
    path: 'dodaj',
    loadChildren: '@admin/add-product/add-product.module#AddProductModule',
  },
  {
    path: 'kategorie',
    loadChildren: '@admin/product-categories/product-categories.module#ProductCategoriesModule',
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
export class ProductsRoutingModule { }
