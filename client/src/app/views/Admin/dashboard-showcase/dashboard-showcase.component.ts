import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { UserService } from '@services/user.service';
import { DocumentRefService } from '@services/document-ref.service';
import { User } from '@models/index';
import { setLoading } from '@helpers/components';
import { dashboardAdminPageTitle } from '@helpers/variables/titles';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-showcase',
  templateUrl: './dashboard-showcase.component.html',
  styleUrls: ['./dashboard-showcase.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardShowcaseComponent implements OnInit, OnDestroy {
  user: User = null;
  isLoading = true;
  subscriptions: Subscription[] = [];

  /* ====== Functions ====== */
  setLoading = null;

  constructor(
    private spinnerService: SpinnerService,
    private userService: UserService,
    private documentRefService: DocumentRefService,
  ) {
    this.documentRefService.nativeDocument.title = dashboardAdminPageTitle;

    this.setLoading = setLoading(this, 'DashboardShowcaseComponent');

    this.addUserSubscription();
  }

  ngOnInit() {
    this.setLoading();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addUserSubscription() {
    this.subscriptions.push(
      this.userService.getUser().subscribe((user: User) => {
        this.user = user;
      }),
    );
  }

  removeSubscriptions() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }
}
