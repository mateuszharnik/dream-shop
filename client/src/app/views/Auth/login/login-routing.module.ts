import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import getRoute from '@helpers/router';
import { clientRoutes } from '@helpers/variables/routes';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: getRoute(clientRoutes.home),
    canActivate: [AuthGuard],
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
