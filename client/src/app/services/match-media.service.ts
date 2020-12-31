import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MatchMediaService {
  isDesktop = false;

  isDesktopSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isDesktop,
  );

  initMatchMedia(width: string = '1024px'): void {
    const media = window.matchMedia(`(min-width: ${width})`);

    this.setDevice(media.matches ? true : false);

    media.addEventListener('change', (e) => {
      this.setDevice(e.matches ? true : false);
    });
  }

  setDevice(isDesktop: boolean) {
    this.isDesktopSubject.next(isDesktop);
  }

  getDevice(): Observable<boolean> {
    return this.isDesktopSubject.asObservable();
  }
}
