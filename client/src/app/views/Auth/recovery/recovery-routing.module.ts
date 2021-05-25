import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import getRoute from '@helpers/router';
import { clientRoutes } from '@helpers/variables/routes';
import { RecoveryComponent } from './recovery.component';

const routes: Routes = [
  {
    path: getRoute(clientRoutes.home),
    canActivate: [AuthGuard],
    component: RecoveryComponent,
  },
  {
    path: ':id',
    loadChildren:
      '@auth/change-password/change-password.module#ChangePasswordModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoveryRoutingModule {}
