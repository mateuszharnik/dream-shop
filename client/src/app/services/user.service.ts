import { Injectable } from '@angular/core';
import { User } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getFullToken, removeToken } from '@helpers/token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = null;
  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient) {}

  fetchUser(id: string): Promise<User> {
    return this.http.get<User>(`http://localhost:3000/v1/users/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  removeUser() {
    removeToken();
    this.userSubject.next(null);
  }
}
