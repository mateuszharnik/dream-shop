import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '@models/index';
import { SpinnerService } from '@services/spinner.service';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-showcase',
  templateUrl: './dashboard-showcase.component.html',
  styleUrls: ['./dashboard-showcase.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardShowcaseComponent implements OnInit, OnDestroy {
  isLoading = true;
  user: User = null;
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService, private userService: UserService) {
    this.subscriptions.push(this.userService.getUser().subscribe((data: User) => {
      this.user = data;
    }));
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
