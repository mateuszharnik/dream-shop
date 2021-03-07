import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderContact, OrderProduct, ProductInCart } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: ProductInCart[] = [];
  productsSubject: BehaviorSubject<ProductInCart[]> = new BehaviorSubject<
    ProductInCart[]
  >(this.products);

  fullProducts: OrderProduct[] = [];
  fullProductsSubject: BehaviorSubject<OrderProduct[]> = new BehaviorSubject<
    OrderProduct[]
  >(this.fullProducts);

  contact: OrderContact = null;
  contactSubject: BehaviorSubject<OrderContact> = new BehaviorSubject<OrderContact>(
    this.contact,
  );

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductInCart[]> {
    const storage: Storage = window.localStorage;

    if (storage) {
      const products: ProductInCart[] =
        JSON.parse(storage.getItem('cart')) || [];
      this.productsSubject.next(products);
    }

    return this.productsSubject.asObservable();
  }

  removeProduct(id: string) {
    const storage: Storage = window.localStorage;
    const products: ProductInCart[] = this.productsSubject.getValue().slice();

    const index = products.findIndex(({ _id }) => _id === id);

    if (index !== -1) {
      products.splice(index, 1);
    }

    if (!products.length) {
      this.contactSubject.next(null);

      if (storage) {
        storage.removeItem('contact');
      }
    }

    if (storage) {
      storage.setItem('cart', JSON.stringify(products));
    }

    this.productsSubject.next(products);
  }

  removeProducts() {
    const storage: Storage = window.localStorage;

    if (storage) {
      storage.removeItem('cart');
    }

    this.productsSubject.next([]);
  }

  setProducts(product: ProductInCart) {
    const storage: Storage = window.localStorage;
    const products: ProductInCart[] = this.productsSubject.getValue().slice();

    const index = products.findIndex(({ _id }) => _id === product._id);

    if (index !== -1) {
      products[index].quantity += product.quantity;
    } else {
      products.push(product);
    }

    if (storage) {
      storage.setItem('cart', JSON.stringify(products));
    }

    this.productsSubject.next(products);
  }

  getContact(): Observable<OrderContact> {
    const storage: Storage = window.localStorage;

    if (storage) {
      const contact: OrderContact =
        JSON.parse(storage.getItem('contact')) || null;
      this.contactSubject.next(contact);
    }

    return this.contactSubject.asObservable();
  }

  removeContact() {
    const storage: Storage = window.localStorage;

    if (storage) {
      storage.removeItem('contact');
    }

    this.contactSubject.next(null);
  }

  setContact(contact: OrderContact) {
    const storage: Storage = window.localStorage;

    if (storage) {
      storage.setItem('contact', JSON.stringify(contact));
    }

    this.contactSubject.next(contact);
  }

  getFullProducts(): Observable<OrderProduct[]> {
    return this.fullProductsSubject.asObservable();
  }

  setFullProducts(fullProducts: OrderProduct[]) {
    this.fullProductsSubject.next(fullProducts);
  }

  removeFullProducts() {
    this.fullProductsSubject.next([]);
  }
}
