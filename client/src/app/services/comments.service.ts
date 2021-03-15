import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFullToken } from '@helpers/token';
import { DeleteResponse, Comment } from '@models/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments: Comment[] = [];
  commentsSubject: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(
    this.comments,
  );

  constructor(private http: HttpClient) {}

  fetchComments(id: string): Promise<Comment[]> {
    return this.http
      .get<Comment[]>(`http://localhost:3000/v1/comments?product_id=${id}`)
      .toPromise();
  }

  fetchComment(id: string): Promise<Comment> {
    return this.http
      .get<Comment>(`http://localhost:3000/v1/comments/${id}`)
      .toPromise();
  }

  saveComment(data: Comment): Promise<Comment> {
    return this.http
      .post<Comment>(`http://localhost:3000/v1/comments`, data)
      .toPromise();
  }

  deleteComment(id: string): Promise<Comment> {
    return this.http
      .request<Comment>('delete', `http://localhost:3000/v1/comments/${id}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  deleteComments(): Promise<DeleteResponse> {
    return this.http
      .request<DeleteResponse>('delete', `http://localhost:3000/v1/comments`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  updateComment(id: string, data: Comment): Promise<Comment> {
    return this.http
      .put<Comment>(`http://localhost:3000/v1/comments/${id}`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: getFullToken(),
        }),
      })
      .toPromise();
  }

  setComments(comments: Comment[]) {
    this.commentsSubject.next(comments);
  }

  getComments(): Observable<Comment[]> {
    return this.commentsSubject.asObservable();
  }
}
