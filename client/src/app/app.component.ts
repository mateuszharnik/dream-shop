import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatchMediaService } from '@services/match-media.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localePL from '@angular/common/locales/pl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class.overflow-hidden') overflow = true;

  isLoading = true;
  spinnerIsLoading = true;
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService, private matchMediaService: MatchMediaService) {
    registerLocaleData(localePL, 'pl-PL');
  }

  ngOnInit() {
    this.subscriptions.push(this.spinnerService.getLoading().subscribe((isLoading: boolean) => {
      this.spinnerIsLoading = isLoading;
      this.overflow = isLoading;
    }));

    this.matchMediaService.initMatchMedia();

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
