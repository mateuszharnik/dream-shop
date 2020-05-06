import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FAQ, FAQCategories } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  faqs: FAQ[] = null;
  categories: FAQCategories[] = null;

  faqsSubject: BehaviorSubject<FAQ[]> = new BehaviorSubject<FAQ[]>(this.faqs);
  categoriesSubject: BehaviorSubject<FAQCategories[]> = new BehaviorSubject<FAQCategories[]>(this.categories);

  constructor(private http: HttpClient) { }

  fetchFAQs(): Promise<FAQ[]> {
    return this.http.get<FAQ[]>(`http://localhost:3000/v1/faq`).toPromise();
  }

  fetchFAQ(id: string): Promise<FAQ> {
    return this.http.get<FAQ>(`http://localhost:3000/v1/faq/${id}`).toPromise();
  }

  fetchCategories(): Promise<FAQCategories[]> {
    return this.http.get<FAQCategories[]>(`http://localhost:3000/v1/faq-categories`).toPromise();
  }

  saveFAQ(faq: FAQ): Promise<FAQ> {
    return this.http.post<FAQ>(`http://localhost:3000/v1/faq`, faq).toPromise();
  }

  deleteFAQ(id: string): Promise<FAQ> {
    return this.http.request<FAQ>('delete', `http://localhost:3000/v1/faq/${id}`).toPromise();
  }

  updateFAQ(id: string, faq: FAQ): Promise<FAQ> {
    return this.http.put<FAQ>(`http://localhost:3000/v1/faq/${id}`, faq).toPromise();
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
