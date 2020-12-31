import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Product } from '@models/index';
import { MatchMediaService } from '@services/match-media.service';
import { Subscription } from 'rxjs';
import SwiperCore, {
  Navigation,
  Pagination,
  Keyboard,
  A11y,
} from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Keyboard, A11y]);

@Component({
  selector: 'app-swiper-slider',
  templateUrl: './swiper-slider.component.html',
  styleUrls: ['./swiper-slider.component.scss'],
  providers: [MatchMediaService],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperSliderComponent implements OnInit, OnDestroy {
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
    this.matchMediaService.initMatchMedia('768px');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }
}
