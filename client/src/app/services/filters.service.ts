import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  filters: Filter[] = [];

  filtersSubject: BehaviorSubject<Filter[]> = new BehaviorSubject<Filter[]>(
    this.filters,
  );

  constructor(private http: HttpClient) {}

  fetchFilters(category = ''): Promise<Filter[]> {
    let url = `http://localhost:3000/v1/product-filters`;

    if (category) {
      url = `${url}?category=${category}`;
    }

    return this.http.get<Filter[]>(url).toPromise();
  }

  setFilters(filters: Filter[]) {
    this.filtersSubject.next(filters);
  }

  getFilters(): Observable<Filter[]> {
    return this.filtersSubject.asObservable();
  }
}
