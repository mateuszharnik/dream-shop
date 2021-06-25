import { Injectable } from '@angular/core';
import { Regulation } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal: Regulation = null;
  modalSubject: BehaviorSubject<Regulation> = new BehaviorSubject<Regulation>(
    this.modal,
  );

  getModal(): Observable<Regulation> {
    return this.modalSubject.asObservable();
  }

  openModal(content: Regulation) {
    if (this.modal) {
      return;
    }

    this.modalSubject.next(content);
  }

  closeModal() {
    this.modalSubject.next(null);
  }
}
