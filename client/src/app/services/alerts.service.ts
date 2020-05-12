import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  alert: string = null;
  alertSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.alert);

  setAlert(alert: string) {
    this.alertSubject.next(alert);
  }

  getAlert(): Observable<string> {
    return this.alertSubject.asObservable();
  }
}
