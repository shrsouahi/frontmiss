import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/Article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: any[] = [];

  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  addArticle(article: Article): Observable<Article> {
    const url = `${this.apiUrl}/articles/addarticle`;
    return this.http.post<Article>(url, article);
  }

  updateArticle(
    idArticle: number,
    updatedArticle: Article
  ): Observable<Article> {
    const url = `${this.apiUrl}/articles/updateArticle/${idArticle}`;
    return this.http.put<Article>(url, updatedArticle);
  }

  getArticlesByCodeCategory(codeCategory: number): Observable<Article[]> {
    const url = `${this.apiUrl}/articles/categorie/${codeCategory}`;
    return this.http.get<Article[]>(url);
  }
  getArticleById(idarticle: number): Observable<Article> {
    const url = `${this.apiUrl}/articles/article/${idarticle}`;
    return this.http.get<Article>(url);
  }

  getAllArticles(): Observable<any> {
    const url = `${this.apiUrl}/articles/getAllArticles`;
    return this.http.get<any>(url);
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

  deleteArticleById(idarticle: number): Observable<void> {
    const url = `${this.apiUrl}/articles/deleteArticle/${idarticle}`;
    return this.http.delete<void>(url);
  }

  updateGlobalQuantityInArticle(
    idArticle: number,
    quantityStock: number
  ): Observable<Article> {
    const url = `${this.apiUrl}/articles/updateGlobalQuantity/${idArticle}`;

    // Append the quantityStock as a query parameter
    const params = new HttpParams().set(
      'quantiteStock',
      quantityStock.toString()
    );

    return this.http.put<Article>(url, null, { params });
  }
}
