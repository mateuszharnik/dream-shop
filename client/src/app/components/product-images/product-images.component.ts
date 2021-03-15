import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatchMediaService } from '@services/match-media.service';
import { Subscription } from 'rxjs';
import SwiperCore, { Navigation, Keyboard, A11y } from 'swiper/core';

SwiperCore.use([Navigation, Keyboard, A11y]);

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
  providers: [MatchMediaService],
  encapsulation: ViewEncapsulation.None,
})
export class ProductImagesComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];

  currentImage = '';
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
    this.currentImage = this.images[0];
    this.matchMediaService.initMatchMedia('1024px');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  changeCurrentImage(image: string) {
    this.currentImage = image;
  }
}
