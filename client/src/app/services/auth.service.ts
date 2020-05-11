import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, Passwords, Response, UserEmail, UserWithToken } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Promise<UserWithToken> {
    return this.http.post<UserWithToken>(`http://localhost:3000/auth/login`, credentials).toPromise();
  }

  sendRecoveryEmail(email: UserEmail): Promise<Response> {
    return this.http.post<Response>(`http://localhost:3000/auth/recovery`, email).toPromise();
  }

  checkRecoveryToken(id: string): Promise<UserEmail> {
    return this.http.get<UserEmail>(`http://localhost:3000/auth/recovery/${id}`).toPromise();
  }

  resetPassword(data: Passwords, id: string): Promise<UserWithToken> {
    return this.http.put<UserWithToken>(`http://localhost:3000/auth/recovery/${id}`, data).toPromise();
  }
}
