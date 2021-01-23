import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'wszystkie',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: ProductsComponent,
    // runGuardsAndResolvers: 'paramsChange',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
