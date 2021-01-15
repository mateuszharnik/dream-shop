import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFullToken } from '@helpers/token';
import { Regulations } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegulationsService {
  regulations: Regulations[] = [];
  regulationsSubject: BehaviorSubject<Regulations[]> = new BehaviorSubject<
    Regulations[]
  >(this.regulations);

  constructor(private http: HttpClient) {}

  fetchRegulations(name?: string): Promise<Regulations[]> {
    let url = 'http://localhost:3000/v1/regulations';

    if (name) {
      url = `${url}?name=${name}`;
    }
    return this.http.get<Regulations[]>(url).toPromise();
  }

  fetchRegulation(id: string): Promise<Regulations> {
    return this.http
      .get<Regulations>(`http://localhost:3000/v1/regulations/${id}`)
      .toPromise();
  }

  updateRegulations(id: string, data: Regulations): Promise<Regulations> {
    return this.http
      .put<Regulations>(`http://localhost:3000/v1/regulations/${id}`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  setRegulations(regulations: Regulations[]) {
    this.regulationsSubject.next(regulations);
  }

  getRegulations(): Observable<Regulations[]> {
    return this.regulationsSubject.asObservable();
  }
}
