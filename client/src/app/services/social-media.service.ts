import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFullToken } from '@helpers/token';
import { SocialMedia } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  socialMedia: SocialMedia = null;
  socialMediaSubject: BehaviorSubject<SocialMedia> = new BehaviorSubject<SocialMedia>(this.socialMedia);

  constructor(private http: HttpClient) { }

  fetchSocialMedia(): Promise<SocialMedia> {
    return this.http.get<SocialMedia>(`http://localhost:3000/v1/social-media`).toPromise();
  }

  saveSocialMedia(id: string, data: SocialMedia): Promise<SocialMedia> {
    return this.http.put<SocialMedia>(`http://localhost:3000/v1/social-media/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  setSocialMedia(socialMedia: SocialMedia) {
    this.socialMediaSubject.next(socialMedia);
  }

  getSocialMedia(): Observable<SocialMedia> {
    return this.socialMediaSubject.asObservable();
  }
}
