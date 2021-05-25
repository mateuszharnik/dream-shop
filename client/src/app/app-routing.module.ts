import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import { InitialGuard } from '@guards/initial.guard';
import { SpinnerGuard } from '@guards/spinner.guard';
import { HomeComponent } from '@webpage/home/home.component';
import { ShowcaseComponent } from '@webpage/showcase/showcase.component';
import getRoute from '@helpers/router';
import { clientRoutes } from '@helpers/variables/routes';

const routes: Routes = [
  {
    path: getRoute(clientRoutes.home),
    data: { showSpinner: true },
    canActivate: [SpinnerGuard, InitialGuard],
    children: [
      {
        path: getRoute(clientRoutes.home),
        component: HomeComponent,
        data: { showSpinner: true },
        canActivate: [SpinnerGuard],
        children: [
          {
            path: getRoute(clientRoutes.home),
            data: { animation: 'home' },
            component: ShowcaseComponent,
          },
          {
            path: getRoute(clientRoutes.cart),
            data: { animation: 'cart' },
            loadChildren: '@webpage/cart/cart.module#CartModule',
          },
          {
            path: getRoute(`${clientRoutes.orders}/:id`),
            data: { animation: 'orders' },
            loadChildren: '@webpage/orders/orders.module#OrdersModule',
          },
          {
            path: getRoute(clientRoutes.about),
            data: { animation: 'about' },
            loadChildren: '@webpage/about/about.module#AboutModule',
          },
          {
            path: getRoute(clientRoutes.contact),
            data: { animation: 'contact' },
            loadChildren: '@webpage/contact/contact.module#ContactModule',
          },
          {
            path: getRoute(clientRoutes.products),
            data: { animation: 'products' },
            loadChildren: '@webpage/products/products.module#ProductsModule',
          },
          {
            path: getRoute(`${clientRoutes.product}/:id`),
            data: { animation: 'product' },
            loadChildren: '@webpage/product/product.module#ProductModule',
          },
          {
            path: getRoute(clientRoutes.faq),
            data: { animation: 'faq' },
            loadChildren: '@webpage/faq/faq.module#FaqModule',
          },
        ],
      },
      {
        path: getRoute(clientRoutes.login),
        loadChildren: '@auth/login/login.module#LoginModule',
      },
      {
        path: getRoute(clientRoutes.recovery),
        loadChildren: '@auth/recovery/recovery.module#RecoveryModule',
      },
      {
        path: getRoute(clientRoutes.admin),
        canActivate: [DashboardGuard],
        children: [
          {
            path: getRoute(clientRoutes.home),
            loadChildren: '@admin/dashboard/dashboard.module#DashboardModule',
          },
        ],
      },
      {
        path: getRoute(clientRoutes.notFound),
        loadChildren: '@webpage/not-found/not-found.module#NotFoundModule',
      },
      {
        path: '**',
        redirectTo: getRoute(clientRoutes.notFound),
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
