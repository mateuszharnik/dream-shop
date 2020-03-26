import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Data, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatchMediaService } from '@services/match-media.service';
import { NavigationService } from '@services/navigation.service';
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
  isLoading = true;
  isDashboard = false;
  isDesktop = false;
  subscriptions: Subscription[] = [];

  constructor(private router: Router, private navigationService: NavigationService, private matchMediaService: MatchMediaService) {}

  ngOnInit() {
    this.subscriptions.push(this.matchMediaService.getDevice().subscribe((isDesktop: boolean) => {
      this.isDesktop = isDesktop;
    }));

    this.closeMenuOnRouteChange();
    this.isDashboard = this.router.url === '/admin';
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  closeMenuOnRouteChange() {
    this.subscriptions.push(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!this.isDesktop) {
          this.navigationService.closeAdminMenu();
        }
        this.setFocus();
        this.isDashboard = event.url === '/admin';
      }
    }));
  }

  skipNavigation() {
    this.navigationService.closeAdminMenu();
    this.setFocus();
  }

  setFocus() {
    this.tabIndex = 0;
    this.header.nativeElement.focus();

    setTimeout(() => {
      this.tabIndex = -1;
    }, 10);
  }

  prepareRoute(outlet: RouterOutlet): RouterOutlet | Data {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
