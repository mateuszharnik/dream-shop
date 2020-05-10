import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, UserWithToken } from '@models/index';

interface Email {
  email: string;
}

interface Response {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Promise<UserWithToken> {
    return this.http.post<UserWithToken>(`http://localhost:3000/auth/login`, credentials).toPromise();
  }

  sendRecoveryEmail(email: Email): Promise<Response> {
    return this.http.post<Response>(`http://localhost:3000/auth/recovery`, email).toPromise();
  }

  checkRecoveryToken(id: string): Promise<Email> {
    return this.http.get<Email>(`http://localhost:3000/auth/recovery/${id}`).toPromise();
  }

  resetPassword(data, id: string): Promise<UserWithToken> {
    return this.http.put<UserWithToken>(`http://localhost:3000/auth/recovery/${id}`, data).toPromise();
  }
}
