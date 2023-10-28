import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/Article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) {}

  getArticlesByCodeCategory(codeCategory: number): Observable<Article[]> {
    const url = `${this.apiUrl}/articles/categorie/${codeCategory}`;
    return this.http.get<Article[]>(url);
  }
  getArticleById(idarticle: number): Observable<Article> {
    const url = `${this.apiUrl}/articles/article/${idarticle}`;
    return this.http.get<Article>(url);
  }
}
