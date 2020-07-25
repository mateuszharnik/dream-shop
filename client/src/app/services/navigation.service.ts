import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Navigation } from '@models/index';

@Injectable()
export class NavigationService {
  searchBar: Navigation = {
    isOpen: false,
    isDisabled: false,
    isAnimated: false,
    animationTime: 350,
  };
  navigation: Navigation = {
    isOpen: false,
    isDisabled: false,
    isAnimated: false,
    animationTime: 350,
  };

  searchBarSubject: BehaviorSubject<Navigation> = new BehaviorSubject<Navigation>(this.searchBar);
  navigationSubject: BehaviorSubject<Navigation> = new BehaviorSubject<Navigation>(this.navigation);

  toggle(prop: 'navigation' | 'searchBar', isOpen?: boolean) {
    const setData = prop === 'navigation' ? this.setNavigation.bind(this) : this.setSearchBar.bind(this);

    this[prop].isAnimated = true;
    this[prop].isDisabled = true;
    this[prop].isOpen = typeof (isOpen) === 'boolean' ? isOpen : !this[prop].isOpen;

    setData(this[prop]);

    setTimeout(() => {
      this[prop].isDisabled = false;
      this[prop].isAnimated = false;

      setData(this[prop]);
    }, this[prop].animationTime);
  }

  closeMenu() {
    const isAnimated: boolean = !this.searchBarSubject.getValue().isAnimated &&
      !this.navigationSubject.getValue().isAnimated;
    const isOpen: boolean = this.searchBarSubject.getValue().isOpen ||
      this.navigationSubject.getValue().isOpen;

    if (isAnimated && isOpen) {
      this.toggle('navigation', false);
      this.toggle('searchBar', false);
    }
  }

  closeAdminMenu() {
    const isAnimated: boolean = !this.navigationSubject.getValue().isAnimated;
    const isOpen: boolean = this.navigationSubject.getValue().isOpen;

    if (isAnimated && isOpen) {
      this.toggle('navigation', false);
    }
  }

  setNavigation(data: Navigation) {
    this.navigationSubject.next(data);
  }

  getNavigation(): Observable<Navigation> {
    return this.navigationSubject.asObservable();
  }

  setSearchBar(data: Navigation) {
    this.searchBarSubject.next(data);
  }

  getSearchBar(): Observable<Navigation> {
    return this.searchBarSubject.asObservable();
  }
}
