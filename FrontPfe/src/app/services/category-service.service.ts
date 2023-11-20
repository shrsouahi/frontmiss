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

  addCategory(newCategory: Category): Observable<Category> {
    const url = `${this.backendUrl}/categories/addcategory`;
    return this.http.post<Category>(url, newCategory);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.backendUrl}/categories`);
  }
  deleteCategorie(codeCategory: number): Observable<Category> {
    return this.http.delete<Category>(
      `${this.backendUrl}/categories/deleteCategory/${codeCategory}`
    );
  }

  getCategorieByid(codeCategory: number): Observable<Category> {
    return this.http.get<Category>(
      `${this.backendUrl}/categories/getCategory/${codeCategory}`
    );
  }

  updateCategory(
    codeCategory: number,
    category: Category
  ): Observable<Category> {
    const url = `${this.backendUrl}/categories/updateCategory/${codeCategory}`;
    return this.http.put<Category>(url, category);
  }
}
