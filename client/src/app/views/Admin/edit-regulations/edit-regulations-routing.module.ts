import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import { EditRegulationsComponent } from './edit-regulations.component';

const routes: Routes = [
   {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: EditRegulationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRegulationsRoutingModule { }
