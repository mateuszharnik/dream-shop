import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFullToken } from '@helpers/token';
import { Contact } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contact: Contact = null;
  contactSubject: BehaviorSubject<Contact> = new BehaviorSubject<Contact>(this.contact);

  constructor(private http: HttpClient) { }

  fetchContact(): Promise<Contact> {
    return this.http.get<Contact>(`http://localhost:3000/v1/contact`).toPromise();
  }

  saveContact(id: string, data: Contact): Promise<Contact> {
    return this.http.put<Contact>(`http://localhost:3000/v1/contact/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  setContact(about: Contact) {
    this.contactSubject.next(about);
  }

  getContact(): Observable<Contact> {
    return this.contactSubject.asObservable();
  }
}
