import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message: Message = null;
  messageSubject: BehaviorSubject<Message> = new BehaviorSubject<Message>(this.message);

  constructor(private http: HttpClient) { }

  getData(): Promise<Message> {
    return this.http.get<Message>(`http://localhost:3000/v1/messages`).toPromise();
  }

  sendData(data: Message): Promise<Message> {
    return this.http.post<Message>(`http://localhost:3000/v1/messages`, data).toPromise();
  }

  setMessages(message: Message) {
    this.messageSubject.next(message);
  }

  getMessages(): Observable<Message> {
    return this.messageSubject.asObservable();
  }
}
