import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit, OnDestroy {
  isLoading = true;
  subscriptions: Subscription[] = [];

  constructor(private router: Router, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.onRouteChange();

    setTimeout(() => {
      this.isLoading = false;
      this.spinnerService.setLoading(this.isLoading);
    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  onRouteChange() {
    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initState();
      }
    }));
  }

  initState() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
