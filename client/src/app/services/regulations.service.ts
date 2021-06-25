import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Regulation } from '@models/index';
import { getFullToken } from '@helpers/token';
import { REGULATIONS_URL } from '@helpers/variables/constants/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegulationsService {
  private regulations: Regulation[] = [];
  private regulationsSubject: BehaviorSubject<Regulation[]> =
    new BehaviorSubject<Regulation[]>(this.regulations);

  constructor(private http: HttpClient) {}

  fetchRegulations(name?: string): Promise<Regulation[]> {
    const url = name ? `${REGULATIONS_URL}?name=${name}` : REGULATIONS_URL;

    return this.http.get<Regulation[]>(url).toPromise();
  }

  fetchRegulation(id: string): Promise<Regulation> {
    return this.http.get<Regulation>(`${REGULATIONS_URL}/${id}`).toPromise();
  }

  updateRegulation(id: string, regulation: Regulation): Promise<Regulation> {
    return this.http
      .put<Regulation>(`${REGULATIONS_URL}/${id}`, regulation, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  setRegulations(regulations: Regulation[]) {
    this.regulationsSubject.next(regulations);
  }

  getRegulations(): Observable<Regulation[]> {
    return this.regulationsSubject.asObservable();
  }
}
