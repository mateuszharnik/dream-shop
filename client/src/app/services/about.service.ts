import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { About } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  about: About = null;
  aboutSubject: BehaviorSubject<About> = new BehaviorSubject<About>(this.about);

  constructor(private http: HttpClient) {}

  fetchAbout(): Promise<About> {
    return this.http.get<About>(`http://localhost:3000/v1/about`).toPromise();
  }

  saveAbout(id: string, data: About): Promise<About> {
    return this.http.put<About>(`http://localhost:3000/v1/about/${id}`, data).toPromise();
  }

  setAbout(about: About) {
    this.aboutSubject.next(about);
  }

  getAbout(): Observable<About> {
    return this.aboutSubject.asObservable();
 }
}
