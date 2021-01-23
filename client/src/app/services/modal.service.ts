import { Injectable } from '@angular/core';
import { Regulations } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal: Regulations = null;
  modalSubject: BehaviorSubject<Regulations> = new BehaviorSubject<Regulations>(
    this.modal,
  );

  getModal(): Observable<Regulations> {
    return this.modalSubject.asObservable();
  }

  openModal(content: Regulations) {
    if (this.modal) {
      return;
    }

    this.modalSubject.next(content);
  }

  closeModal() {
    this.modalSubject.next(null);
  }
}
