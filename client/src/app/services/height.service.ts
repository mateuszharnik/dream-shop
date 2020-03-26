import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HeightService {
  height = 0;

  heightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.height);

  setHeight(height: number) {
    this.heightSubject.next(height);
  }

  getHeight(): Observable<number> {
    return this.heightSubject.asObservable();
  }
}
