import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private backendUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.backendUrl}/categories`);
  }
}
