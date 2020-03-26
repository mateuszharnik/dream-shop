import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  isLoading = true;

  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoading);

  setLoading(data: boolean) {
    this.isLoadingSubject.next(data);
  }

  getLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  getLoadingValue(): boolean {
    return this.isLoadingSubject.getValue();
  }
}
