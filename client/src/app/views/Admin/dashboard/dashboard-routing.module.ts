import { DashboardShowcaseComponent } from '@admin/dashboard-showcase/dashboard-showcase.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '@guards/dashboard.guard';
import { SpinnerGuard } from '@guards/spinner.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { showSpinner: true },
    canActivate: [SpinnerGuard],
    children: [
      {
        path: '',
        canActivate: [DashboardGuard],
        component: DashboardShowcaseComponent,
      },
      {
        path: 'social-media',
        loadChildren: '@admin/social-media/social-media.module#SocialMediaModule',
      },
      {
        path: 'produkty',
        loadChildren: '@admin/browse-product/browse-product.module#BrowseProductModule',
      },
      {
        path: 'profil',
        loadChildren: '@admin/profile/profile.module#ProfileModule',
      },
      {
        path: 'strony',
        children: [
          {
            path: 'kontakt',
            loadChildren: '@admin/contact/contact.module#ContactModule',
          },
          {
            path: 'o-nas',
            loadChildren: '@admin/about/about.module#AboutModule',
          },
          {
            path: 'najczesciej-zadawane-pytania',
            loadChildren: '@admin/faq/faq.module#FAQModule',
          },
        ],
      },
      {
        path: 'newsletter',
        loadChildren: '@admin/newsletter/newsletter.module#NewsletterModule',
      },
      {
        path: 'nawigacja',
        loadChildren: '@admin/navigation/navigation.module#NavigationModule',
      },
      {
        path: 'wiadomosci',
        loadChildren: '@admin/messages/messages.module#MessagesModule',
      },
      {
        path: 'mapa',
        loadChildren: '@admin/map/map.module#MapModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
