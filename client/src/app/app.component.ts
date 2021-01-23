import { registerLocaleData } from '@angular/common';
import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { MatchMediaService } from '@services/match-media.service';
import { WindowRefService } from '@services/window-ref.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import localePL from '@angular/common/locales/pl';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class.overflow-hidden') overflow = true;

  throttleListener = null;
  debounceListener = null;
  spinnerIsLoading = true;
  windowEl: Window = null;
  listenerTime = 1000;
  subscriptions: Subscription[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private matchMediaService: MatchMediaService,
    private windowRefService: WindowRefService,
    private renderer: Renderer2,
  ) {
    this.windowEl = this.windowRefService.nativeWindow;

    this.throttleListener = this.renderer.listen(
      'window',
      'scroll',
      throttle(AOS.refresh, this.listenerTime),
    );
    this.debounceListener = this.renderer.listen(
      'window',
      'scroll',
      debounce(AOS.refresh, this.listenerTime),
    );

    this.subscriptions.push(
      this.spinnerService.getLoading().subscribe((isLoading: boolean) => {
        this.spinnerIsLoading = isLoading;
        this.overflow = isLoading;
      }),
    );

    registerLocaleData(localePL, 'pl-PL');
  }

  async ngOnInit() {
    AOS.init();

    this.matchMediaService.initMatchMedia();
  }

  ngOnDestroy() {
    if (this.throttleListener) {
      this.throttleListener();
    }

    if (this.debounceListener) {
      this.debounceListener();
    }

    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }
}
