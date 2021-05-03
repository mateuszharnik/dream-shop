import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFullToken } from '@helpers/token';
import {
  DeleteResponse,
  Product,
  ProductCategory,
  ProductCategoryWithPagination,
  ProductInCart,
  ProductParams,
  ProductWithPagination,
} from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];
  productsInCart: Product[] = [];
  categories: ProductCategoryWithPagination = null;

  productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    this.products,
  );

  productsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >(this.productsInCart);

  categoriesSubject: BehaviorSubject<ProductCategoryWithPagination> = new BehaviorSubject<ProductCategoryWithPagination>(
    this.categories,
  );

  constructor(private http: HttpClient) {}

  fetchProducts(options: ProductParams = {}): Promise<ProductWithPagination> {
    const params = Object.assign({ skip: 0, limit: 12 }, options);

    const { skip, limit, search, category, sort, sortType, available } = params;

    let url = `http://localhost:3000/v1/products?skip=${skip}&limit=${limit}`;

    if (category && category !== 'wszystkie') {
      url = `${url}&category=${category}`;
    }

    if (search) {
      url = `${url}&search=${search}`;
    }

    if (available) {
      url = `${url}&available=${available}`;
    }

    if (sort && sortType) {
      url = `${url}&sort=${sort}&sortType=${sortType}`;
    }

    return this.http.get<ProductWithPagination>(url).toPromise();
  }

  fetchProductsInCart(
    products: ProductInCart[],
  ): Promise<ProductWithPagination> {
    const ids: string[] = products.map((product: ProductInCart) => product._id);

    return this.http
      .get<ProductWithPagination>(
        `http://localhost:3000/v1/products?cart=${ids.join(',')}`,
      )
      .toPromise();
  }

  updateProduct(id: string, data: FormData): Promise<Product> {
    return this.http
      .put<Product>(`http://localhost:3000/v1/products/${id}`, data, {
        headers: new HttpHeaders({
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  fetchProduct(id: string): Promise<Product> {
    return this.http
      .get<Product>(`http://localhost:3000/v1/products/${id}`)
      .toPromise();
  }

  saveProduct(data: FormData): Promise<Product> {
    return this.http
      .post<Product>(`http://localhost:3000/v1/products`, data, {
        headers: new HttpHeaders({
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  deleteProduct(id: string): Promise<Product> {
    return this.http
      .request<Product>('delete', `http://localhost:3000/v1/products/${id}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  deleteProducts(): Promise<DeleteResponse> {
    return this.http
      .request<DeleteResponse>('delete', `http://localhost:3000/v1/products`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  fetchProductCategories(): Promise<ProductCategoryWithPagination> {
    return this.http
      .get<ProductCategoryWithPagination>(
        `http://localhost:3000/v1/product-categories`,
      )
      .toPromise();
  }

  saveProductCategory(data: ProductCategory): Promise<ProductCategory> {
    return this.http
      .post<ProductCategory>(
        `http://localhost:3000/v1/product-categories`,
        data,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: getFullToken(),
          }),
        },
      )
      .toPromise();
  }

  deleteProductCategories(): Promise<DeleteResponse> {
    return this.http
      .request<DeleteResponse>(
        'delete',
        `http://localhost:3000/v1/product-categories`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: getFullToken(),
          }),
        },
      )
      .toPromise();
  }

  deleteProductCategory(id: string): Promise<ProductCategory> {
    return this.http
      .request<ProductCategory>(
        'delete',
        `http://localhost:3000/v1/product-categories/${id}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: getFullToken(),
          }),
        },
      )
      .toPromise();
  }

  setCategories(categories: ProductCategoryWithPagination) {
    this.categoriesSubject.next(categories);
  }

  getCategories(): Observable<ProductCategoryWithPagination> {
    return this.categoriesSubject.asObservable();
  }

  setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  setProductsInCart(products: Product[]) {
    this.productsInCartSubject.next(products);
  }

  getProductsInCart(): Observable<Product[]> {
    return this.productsInCartSubject.asObservable();
  }
}
