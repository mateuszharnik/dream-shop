import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFullToken } from '@helpers/token';
import { DeleteResponse, Email } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  emails: Email[] = [];
  emailsSubject: BehaviorSubject<Email[]> = new BehaviorSubject<Email[]>(this.emails);

  constructor(private http: HttpClient) { }

  fetchEmails(): Promise<Email[]> {
    return this.http.get<Email[]>(`http://localhost:3000/v1/newsletter`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  deleteEmail(id: string): Promise<Email> {
    return this.http.request<Email>('delete', `http://localhost:3000/v1/newsletter/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  deleteEmails(): Promise<DeleteResponse> {
    return this.http.request<DeleteResponse>('delete', `http://localhost:3000/v1/newsletter`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  saveEmail(data: Email): Promise<Email> {
    return this.http.post<Email>(`http://localhost:3000/v1/newsletter`, data).toPromise();
  }

  setEmails(emails: Email[]) {
    this.emailsSubject.next(emails);
  }

  getEmails(): Observable<Email[]> {
    return this.emailsSubject.asObservable();
  }
}
