import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '@models/index';
import { MatchMediaService } from '@services/match-media.service';
import { Subscription } from 'rxjs';
import SwiperCore, { Navigation, Keyboard, A11y, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Keyboard, A11y, Pagination]);

@Component({
  selector: 'app-viewed-products',
  templateUrl: './viewed-products.component.html',
  styleUrls: ['./viewed-products.component.scss'],
  providers: [MatchMediaService],
  encapsulation: ViewEncapsulation.None,
})
export class ViewedProductsComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];

  isDesktop = false;
  subscriptions: Subscription[] = [];

  constructor(private matchMediaService: MatchMediaService) {
    this.subscriptions.push(
      this.matchMediaService.getDevice().subscribe((isDesktop: boolean) => {
        this.isDesktop = isDesktop;
      }),
    );
  }

  ngOnInit() {
    this.matchMediaService.initMatchMedia('570px');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }
}
