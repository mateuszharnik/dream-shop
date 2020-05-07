import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Email } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  emails: Email[] = null;
  emailsSubject: BehaviorSubject<Email[]> = new BehaviorSubject<Email[]>(this.emails);

  constructor(private http: HttpClient) { }

  fetchEmails(): Promise<Email[]> {
    return this.http.get<Email[]>(`http://localhost:3000/v1/newsletter`).toPromise();
  }

  deleteEmail(id: string): Promise<Email> {
    return this.http.request<Email>('delete', `http://localhost:3000/v1/newsletter/${id}`).toPromise();
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