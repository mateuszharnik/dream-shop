import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-navbar-item',
  templateUrl: './dashboard-navbar-item.component.html',
  styleUrls: ['./dashboard-navbar-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardNavbarItemComponent {
  @Input() item = [];

  computedIconClass(icon: string): string {
    return `${icon} mr-1 dashboard-navigation__icon`;
  }
}
