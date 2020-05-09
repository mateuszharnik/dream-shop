import { DashboardShowcaseComponent } from '@admin/dashboard-showcase/dashboard-showcase.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'produkty/dodaj',
        loadChildren: '@admin/add-product/add-product.module#AddProductModule',
      },
      {
        path: 'produkty/:id/edytuj',
        loadChildren: '@admin/edit-product/edit-product.module#EditProductModule',
      },
      {
        path: 'profil',
        loadChildren: '@admin/profile/profile.module#ProfileModule',
      },
      {
        path: 'strony/kontakt',
        loadChildren: '@admin/contact/contact.module#ContactModule',
      },
      {
        path: 'strony/o-nas',
        loadChildren: '@admin/about/about.module#AboutModule',
      },
      {
        path: 'strony/najczesciej-zadawane-pytania',
        loadChildren: '@admin/faq/faq.module#FAQModule',
      },
      {
        path: 'strony/najczesciej-zadawane-pytania/dodaj',
        loadChildren: '@admin/add-faq/add-faq.module#AddFAQModule',
      },
      {
        path: 'strony/najczesciej-zadawane-pytania/:id/edytuj',
        loadChildren: '@admin/edit-faq/edit-faq.module#EditFAQModule',
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
export class DashboardRoutingModule {}
