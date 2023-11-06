import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/Article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: any[] = [];

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

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.articles));
  }
  addToCart(addedProduct: any) {
    this.articles.push(addedProduct);
    this.saveCart();
  }

  loadCart() {
    this.articles = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  articleInCart(article: any) {
    return this.articles.findIndex((x: any) => x.id === article.id) > -1;
  }

  removeArticle(article: any) {
    const index = this.articles.findIndex((x: any) => x.id === article.id);

    if (index > -1) {
      this.articles.splice(index, 1);
      this.saveCart();
    }
  }

  clearArticles() {
    localStorage.clear();
  }
}
