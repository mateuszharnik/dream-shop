import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DashboardNavigation } from '@models/index';

@Component({
  selector: 'app-dashboard-navbar-item',
  templateUrl: './dashboard-navbar-item.component.html',
  styleUrls: ['./dashboard-navbar-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardNavbarItemComponent {
  @Input() item: DashboardNavigation = null;

  computedIconClass(icon: string): string {
    return `${icon} mr-1 dashboard-navigation__icon`;
  }
}
