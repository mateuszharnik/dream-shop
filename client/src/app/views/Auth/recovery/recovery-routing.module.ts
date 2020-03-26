import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryComponent } from './recovery.component';

const routes: Routes = [
  {
    path: '',
    component: RecoveryComponent,
  },
  {
    path: ':id',
    loadChildren: '@auth/change-password/change-password.module#ChangePasswordModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoveryRoutingModule {}
