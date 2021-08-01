import { Injectable } from '@angular/core';
import { Product } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ViewedProductsService {
  numberOfProducts = 20;
  products: Product[] = [];
  productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    this.products,
  );

  setProduct(product: Product) {
    const isInArray: boolean =
      this.products.findIndex(
        (productFromArray) => productFromArray._id === product._id,
      ) !== -1;

    if (isInArray) {
      return;
    }

    this.products.push(product);
    this.products = this.products.slice(-this.numberOfProducts);

    if (window.localStorage) {
      window.localStorage.setItem('products', JSON.stringify(this.products));
    }

    this.productsSubject.next(this.products);
  }

  removeProducts() {
    if (window.localStorage) {
      window.localStorage.removeItem('products');
    }

    this.productsSubject.next([]);
  }

  setProducts(products: Product[]) {
    products.forEach((product: Product) => {
      const isInArray: boolean =
        this.products.findIndex(
          (productFromArray) => productFromArray._id === product._id,
        ) !== -1;

      if (!isInArray) {
        this.products.push(product);
        this.products = this.products.slice(-this.numberOfProducts);
      }
    });

    if (window.localStorage) {
      window.localStorage.setItem('products', JSON.stringify(this.products));
    }

    this.productsSubject.next(this.products);
  }

  getProducts(): Observable<Product[]> {
    if (window.localStorage && !this.products.length) {
      this.products = JSON.parse(window.localStorage.getItem('products')) || [];
      this.productsSubject.next(this.products);
    }

    return this.productsSubject.asObservable();
  }
}
