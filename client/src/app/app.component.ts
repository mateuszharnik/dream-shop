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

  spinnerIsLoading = true;
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService, private matchMediaService: MatchMediaService) {
    this.subscriptions.push(this.spinnerService.getLoading().subscribe((isLoading: boolean) => {
      this.spinnerIsLoading = isLoading;
      this.overflow = isLoading;
    }));

    registerLocaleData(localePL, 'pl-PL');
  }

  async ngOnInit() {
    this.matchMediaService.initMatchMedia();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
