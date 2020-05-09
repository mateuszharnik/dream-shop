import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerGuard } from '@guards/spinner.guard';
import { HomeComponent } from '@webpage/home/home.component';
import { ShowcaseComponent } from '@webpage/showcase/showcase.component';
import { DashboardGuard } from '@guards/dashboard.guard';
import { InitialGuard } from '@guards/initial.guard';

const routes: Routes = [
  {
    path: '',
    data: { showSpinner: true },
    canActivate: [SpinnerGuard, InitialGuard],
    children: [
{
        path: '',
        component: HomeComponent,
        data: { showSpinner: true },
        canActivate: [SpinnerGuard],
        children: [
          {
            path: '',
            data: { animation: 'home' },
            component: ShowcaseComponent,
          },
          {
            path: 'koszyk',
            data: { animation: 'cart' },
            loadChildren: '@webpage/cart/cart.module#CartModule',
          },
          {
            path: 'o-nas',
            data: { animation: 'about' },
            loadChildren: '@webpage/about/about.module#AboutModule',
          },
          {
            path: 'kontakt',
            data: { animation: 'contact' },
            loadChildren: '@webpage/contact/contact.module#ContactModule',
          },
          {
            path: 'produkty',
            data: { animation: 'products' },
            loadChildren: '@webpage/products/products.module#ProductsModule',
          },
          {
            path: 'najczesciej-zadawane-pytania',
            data: { animation: 'faq' },
            loadChildren: '@webpage/faq/faq.module#FaqModule',
          },
        ],
      },
      {
        path: 'zaloguj',
        loadChildren: '@auth/login/login.module#LoginModule',
      },
      {
        path: 'odzyskaj',
        loadChildren: '@auth/recovery/recovery.module#RecoveryModule',
      },
      {
        path: 'admin',
        canActivate: [DashboardGuard],
        children: [
          {
            path: '',
            loadChildren: '@admin/dashboard/dashboard.module#DashboardModule',
          },
        ],
      },
      {
        path: '404',
        loadChildren: '@webpage/not-found/not-found.module#NotFoundModule',
      },
      {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
