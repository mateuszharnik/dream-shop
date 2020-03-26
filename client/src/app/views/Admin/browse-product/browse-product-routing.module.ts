import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseProductComponent } from './browse-product.component';

const routes: Routes = [
  {
    path: '',
    component: BrowseProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseProductRoutingModule {}
