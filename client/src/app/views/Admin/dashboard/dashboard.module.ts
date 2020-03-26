import { DashboardShowcaseComponent } from '@admin/dashboard-showcase/dashboard-showcase.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardNavbarItemComponent } from '@components/DashboardNavbar/dashboard-navbar-item/dashboard-navbar-item.component';
import { DashboardNavbarListComponent } from '@components/DashboardNavbar/dashboard-navbar-list/dashboard-navbar-list.component';
import { DashboardNavbarComponent } from '@components/DashboardNavbar/dashboard-navbar/dashboard-navbar.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardShowcaseComponent,
    DashboardNavbarComponent,
    DashboardNavbarListComponent,
    DashboardNavbarItemComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule {}
