import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contact: Contact = null;
  contactSubject: BehaviorSubject<Contact> = new BehaviorSubject<Contact>(this.contact);

  constructor(private http: HttpClient) {}

  fetchContact(): Promise<Contact> {
    return this.http.get<Contact>(`http://localhost:3000/v1/contact`).toPromise();
  }

  saveContact(id: string, data: Contact): Promise<Contact> {
    return this.http.put<Contact>(`http://localhost:3000/v1/contact/${id}`, data).toPromise();
  }

  setContact(about: Contact) {
    this.contactSubject.next(about);
  }

  getContact(): Observable<Contact> {
    return this.contactSubject.asObservable();
  }
}
