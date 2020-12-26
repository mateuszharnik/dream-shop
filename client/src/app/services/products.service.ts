import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFullToken } from '@helpers/token';
import { DeleteResponse, Product, ProductCategory, ProductWithPagination } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];
  categories: ProductCategory[] = [];

  productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.products);
  categoriesSubject: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>(this.categories);

  constructor(private http: HttpClient) { }

  fetchProducts(skip?: number, limit?: number, category?: string, search?: string): Promise<ProductWithPagination> {
    let url = `http://localhost:3000/v1/products?skip=${skip}&limit=${limit}`;

    if (category) {
      url = `${url}&category=${category}`;
    }

    if (search) {
      url = `${url}&search=${search}`;
    }

    return this.http.get<ProductWithPagination>(url).toPromise();
  }

  fetchProduct(id: string): Promise<Product> {
    return this.http.get<Product>(`http://localhost:3000/v1/products/${id}`).toPromise();
  }

  saveProduct(data: FormData): Promise<Product> {
    return this.http.post<Product>(`http://localhost:3000/v1/products`, data, {
      headers: new HttpHeaders({
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  deleteProduct(id: string): Promise<Product> {
    return this.http.request<Product>('delete', `http://localhost:3000/v1/products/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  deleteProducts(): Promise<DeleteResponse> {
    return this.http.request<DeleteResponse>('delete', `http://localhost:3000/v1/products`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  fetchProductCategories(): Promise<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`http://localhost:3000/v1/product-categories`).toPromise();
  }

  saveProductCategory(data: ProductCategory): Promise<ProductCategory> {
    return this.http.post<ProductCategory>(`http://localhost:3000/v1/product-categories`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  deleteProductCategories(): Promise<DeleteResponse> {
    return this.http.request<DeleteResponse>('delete', `http://localhost:3000/v1/product-categories`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  deleteProductCategory(id: string): Promise<ProductCategory> {
    return this.http.request<ProductCategory>('delete', `http://localhost:3000/v1/product-categories/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: getFullToken(),
      }),
    }).toPromise();
  }

  setCategories(categories: ProductCategory[]) {
    this.categoriesSubject.next(categories);
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.categoriesSubject.asObservable();
  }

  setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }
}
