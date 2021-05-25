import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  Data,
  NavigationEnd,
  Router,
  RouterOutlet,
  Event,
} from '@angular/router';
import { MatchMediaService } from '@services/match-media.service';
import { NavigationService } from '@services/navigation.service';
import { clientRoutes } from '@helpers/variables/routes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NavigationService],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('header') header: any;

  tabIndex = -1;
  timeout = 10;
  isLoading = true;
  isDashboard = false;
  isDesktop = false;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private matchMediaService: MatchMediaService,
  ) {
    this.addMatchMediaSubscription();
    this.closeMenuOnRouteChange();
  }

  ngOnInit() {
    this.isDashboard = this.router.url === clientRoutes.admin;
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addMatchMediaSubscription() {
    this.subscriptions.push(
      this.matchMediaService.getDevice().subscribe((isDesktop: boolean) => {
        this.isDesktop = isDesktop;
      }),
    );
  }

  removeSubscriptions() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  closeMenuOnRouteChange() {
    this.subscriptions.push(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if (!this.isDesktop) {
            this.navigationService.closeAdminMenu();
          }
          this.setFocus();
          this.isDashboard = event.url === clientRoutes.admin;
        }
      }),
    );
  }

  skipNavigation() {
    this.navigationService.closeAdminMenu();
    this.setFocus();
  }

  setFocus() {
    this.tabIndex = 0;

    if (this.header) {
      this.header.nativeElement.focus();
    }

    setTimeout(() => {
      this.tabIndex = -1;
    }, this.timeout);
  }

  prepareRoute(outlet: RouterOutlet): RouterOutlet | Data {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
