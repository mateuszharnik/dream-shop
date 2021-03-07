import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getFullToken } from '@helpers/token';
import { Order, DeleteResponse, OrderWithPagination } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders: Order[] = [];
  ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(
    this.orders,
  );

  constructor(private http: HttpClient) {}

  fetchOrders(skip?: number, limit?: number): Promise<OrderWithPagination> {
    return this.http
      .get<OrderWithPagination>(
        `http://localhost:3000/v1/orders?skip=${skip}&limit=${limit}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: getFullToken(),
          }),
        },
      )
      .toPromise();
  }

  fetchOrder(id: string): Promise<Order> {
    return this.http
      .get<Order>(`http://localhost:3000/v1/orders/${id}`)
      .toPromise();
  }

  saveOrder(data: Order): Promise<Order> {
    return this.http
      .post<Order>(`http://localhost:3000/v1/orders`, data)
      .toPromise();
  }

  deleteOrder(id: string): Promise<Order> {
    return this.http
      .request<Order>('delete', `http://localhost:3000/v1/orders/${id}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  deleteOrders(): Promise<DeleteResponse> {
    return this.http
      .request<DeleteResponse>('delete', `http://localhost:3000/v1/orders`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  updateOrder(id: string, refuse: boolean): Promise<Order> {
    let url = `http://localhost:3000/v1/orders`;

    if (refuse) {
      url = `${url}/refuse/${id}`;
    } else {
      url = `${url}/accept/${id}`;
    }

    return this.http
      .put<Order>(
        url,
        {},
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: getFullToken(),
          }),
        },
      )
      .toPromise();
  }

  paidOrder(id: string): Promise<Order> {
    return this.http
      .put<Order>(
        `http://localhost:3000/v1/orders/paid/${id}`,
        {},
      )
      .toPromise();
  }

  setOrders(orders: Order[]) {
    this.ordersSubject.next(orders);
  }

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }
}
