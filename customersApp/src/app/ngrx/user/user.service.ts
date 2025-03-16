import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://620e9760ec8b2ee28326ae84.mockapi.io/api/1/users';

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Cache-Control': 'no-cache',
  });

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.headers });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.headers,
    });
  }
}
