import {
  Component,
  ViewEncapsulation,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Slide } from '@animations/index';
import { MatchMediaService } from '@services/match-media.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-filters',
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.scss'],
  animations: [Slide],
  providers: [MatchMediaService],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsFiltersComponent implements OnInit, OnDestroy {
  @HostBinding('class.block') display = true;
  @HostBinding('class.mx-3') margin = true;
  @Input() filterButtonText = '';
  @Input() filterIcon = '';
  @Output() whenProductsFiltered: EventEmitter<any> = new EventEmitter<any>();

  isOpen = false;
  isDesktop = false;
  isDisabled = false;
  animationTime = 350;
  available = false;
  subscriptions: Subscription[] = [];

  constructor(private matchMediaService: MatchMediaService) {
    this.subscriptions.push(
      this.matchMediaService.getDevice().subscribe((isDesktop: boolean) => {
        this.isDesktop = isDesktop;
      }),
    );
  }

  ngOnInit() {
    this.matchMediaService.initMatchMedia('1024px');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  toggleFilters() {
    this.isDisabled = true;

    setTimeout(() => {
      this.isOpen = !this.isOpen;
      this.isDisabled = false;
    }, this.animationTime);
  }

  buttonTitle(value: boolean): 'Pokaż' | 'Ukryj' {
    return value ? 'Ukryj' : 'Pokaż';
  }

  filterProducts() {
    this.whenProductsFiltered.emit(this.available);

    this.isOpen = false;
  }
}
