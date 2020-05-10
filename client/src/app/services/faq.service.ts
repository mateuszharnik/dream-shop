import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFullToken } from '@helpers/token';
import { FAQ, FAQCategories, DeleteResponse } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  faqs: FAQ[] = [];
  categories: FAQCategories[] = [];

  faqsSubject: BehaviorSubject<FAQ[]> = new BehaviorSubject<FAQ[]>(this.faqs);
  categoriesSubject: BehaviorSubject<FAQCategories[]> = new BehaviorSubject<FAQCategories[]>(this.categories);

  constructor(private http: HttpClient) { }

  fetchFAQs(): Promise<FAQ[]> {
    return this.http.get<FAQ[]>(`http://localhost:3000/v1/faq`).toPromise();
  }

  fetchFAQ(id: string): Promise<FAQ> {
    return this.http.get<FAQ>(`http://localhost:3000/v1/faq/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  fetchCategories(): Promise<FAQCategories[]> {
    return this.http.get<FAQCategories[]>(`http://localhost:3000/v1/faq-categories`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  saveFAQ(data: FAQ): Promise<FAQ> {
    return this.http.post<FAQ>(`http://localhost:3000/v1/faq`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  deleteFAQ(id: string): Promise<FAQ> {
    return this.http.request<FAQ>('delete', `http://localhost:3000/v1/faq/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  deleteFAQs(): Promise<DeleteResponse> {
    return this.http.request<DeleteResponse>('delete', `http://localhost:3000/v1/faq`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  updateFAQ(id: string, data: FAQ): Promise<FAQ> {
    return this.http.put<FAQ>(`http://localhost:3000/v1/faq/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  setCategories(categories: FAQCategories[]) {
    this.categoriesSubject.next(categories);
  }

  getCategories(): Observable<FAQCategories[]> {
    return this.categoriesSubject.asObservable();
  }

  setFAQs(faqs: FAQ[]) {
    this.faqsSubject.next(faqs);
  }

  getFAQs(): Observable<FAQ[]> {
    return this.faqsSubject.asObservable();
  }
}
