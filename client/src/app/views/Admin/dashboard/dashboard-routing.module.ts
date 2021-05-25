import { DashboardShowcaseComponent } from '@admin/dashboard-showcase/dashboard-showcase.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import { SpinnerGuard } from '@guards/spinner.guard';
import getRoute from '@helpers/router';
import { clientRoutes } from '@helpers/variables/routes';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: getRoute(clientRoutes.home),
    component: DashboardComponent,
    data: { showSpinner: true },
    canActivate: [SpinnerGuard],
    children: [
      {
        path: getRoute(clientRoutes.home),
        canActivate: [DashboardGuard],
        component: DashboardShowcaseComponent,
      },
      {
        path: getRoute(clientRoutes.socialMedia),
        loadChildren:
          '@admin/social-media/social-media.module#SocialMediaModule',
      },
      {
        path: getRoute(clientRoutes.orders),
        loadChildren: '@admin/orders/orders.module#OrdersModule',
      },
      {
        path: getRoute(clientRoutes.products),
        loadChildren: '@admin/products/products.module#ProductsModule',
      },
      {
        path: getRoute(clientRoutes.profile),
        loadChildren: '@admin/profile/profile.module#ProfileModule',
      },
      {
        path: getRoute(clientRoutes.pages),
        children: [
          {
            path: getRoute(clientRoutes.contact),
            loadChildren: '@admin/contact/contact.module#ContactModule',
          },
          {
            path: getRoute(clientRoutes.about),
            loadChildren: '@admin/about/about.module#AboutModule',
          },
          {
            path: getRoute(clientRoutes.faq),
            loadChildren: '@admin/faq/faq.module#FAQModule',
          },
        ],
      },
      {
        path: getRoute(clientRoutes.regulations),
        loadChildren: '@admin/regulations/regulations.module#RegulationsModule',
      },
      {
        path: getRoute(clientRoutes.newsletter),
        loadChildren: '@admin/newsletter/newsletter.module#NewsletterModule',
      },
      {
        path: getRoute(clientRoutes.messages),
        loadChildren: '@admin/messages/messages.module#MessagesModule',
      },
      {
        path: getRoute(clientRoutes.map),
        loadChildren: '@admin/map/map.module#MapModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
