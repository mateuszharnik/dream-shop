import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Map } from '@models/index';
import { getFullToken } from '@helpers/token';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: Map = null;
  mapSubject: BehaviorSubject<Map> = new BehaviorSubject<Map>(this.map);

  constructor(private http: HttpClient) {}

  fetchMap(): Promise<Map> {
    return this.http.get<Map>(`http://localhost:3000/v1/map`).toPromise();
  }

  saveMap(id: string, data: Map): Promise<Map> {
    return this.http.put<Map>(`http://localhost:3000/v1/map/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  setMap(about: Map) {
    this.mapSubject.next(about);
  }

  getMap(): Observable<Map> {
    return this.mapSubject.asObservable();
 }
}
