import { Component, ViewEncapsulation, Input, HostBinding, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Slide } from '@animations/index';
import { MatchMediaService } from '@services/match-media.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-sort',
  templateUrl: './products-sort.component.html',
  styleUrls: ['./products-sort.component.scss'],
  animations: [Slide],
  providers: [MatchMediaService],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsSortComponent implements OnInit, OnDestroy {
  @HostBinding('class.block') display = true;
  @HostBinding('class.mx-3') margin = true;
  @Input() sortIcon: string = null;
  @Input() sortButtonText = '';
  @Output() whenProductsSorted: EventEmitter<any> = new EventEmitter<any>();

  isOpen = false;
  isDesktop = false;
  isDisabled = false;
  animationTime = 350;
  option = 'popularDesc';
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

  toggleSort() {
    this.isDisabled = true;

    setTimeout(() => {
      this.isOpen = !this.isOpen;
      this.isDisabled = false;
    }, this.animationTime);
  }

  buttonTitle(value: boolean): 'Pokaż' | 'Ukryj' {
    return value ? 'Ukryj' : 'Pokaż';
  }

  sortProducts() {
    let sort = '';
    const sortType =
      this.option.toLocaleLowerCase().search('asc') !== -1 ? 'asc' : 'desc';

    if (this.option.toLocaleLowerCase().search('price') !== -1) {
      sort = 'cena';
    } else if (this.option.toLocaleLowerCase().search('name') !== -1) {
      sort = 'alfabet';
    } else {
      sort = 'popularnosc';
    }

    this.whenProductsSorted.emit({ sort, sortType });
    this.isOpen = false;
  }
}
