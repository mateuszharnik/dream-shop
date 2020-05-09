import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFullToken } from '@helpers/token';
import { Message } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = null;
  messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(this.messages);

  constructor(private http: HttpClient) { }

  fetchMessages(): Promise<Message[]> {
    return this.http.get<Message[]>(`http://localhost:3000/v1/messages`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  saveMessage(data: Message): Promise<Message> {
    return this.http.post<Message>(`http://localhost:3000/v1/messages`, data).toPromise();
  }

  deleteMessage(id: string): Promise<Message> {
    return this.http.request<Message>('delete', `http://localhost:3000/v1/messages/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  setMessages(messages: Message[]) {
    this.messagesSubject.next(messages);
  }

  getMessages(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }
}
