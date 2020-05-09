import { Injectable } from '@angular/core';
import { Credentials, UserWithToken } from '@models/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Promise<UserWithToken> {
    return this.http.post<UserWithToken>(`http://localhost:3000/auth/login`, credentials).toPromise();
  }
}
