import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocialMedia } from '@models/index';

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
    return this.http.put<SocialMedia>(`http://localhost:3000/v1/social-media/${id}`, data).toPromise();
  }

  setSocialMedia(socialMedia: SocialMedia) {
    this.socialMediaSubject.next(socialMedia);
  }

  getSocialMedia(): Observable<SocialMedia> {
    return this.socialMediaSubject.asObservable();
  }
}
