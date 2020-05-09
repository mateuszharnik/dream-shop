import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialMediaComponent } from './social-media.component';
import { DashboardGuard } from '@guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    data: { isAdmin: true },
    canActivate: [DashboardGuard],
    component: SocialMediaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialMediaRoutingModule {}
