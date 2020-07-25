import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FooterService {
  height = 0;

  heightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.height);

  setHeight(height: number) {
    this.heightSubject.next(height);
  }

  getHeight(): number {
    return this.heightSubject.getValue();
  }
}
