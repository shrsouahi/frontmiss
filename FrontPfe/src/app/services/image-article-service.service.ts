import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageArticle } from '../models/ImageArticle.model';

@Injectable({
  providedIn: 'root',
})
export class ImageArticleService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getImagesForArticle(articleId: number): Observable<ImageArticle[]> {
    const url = `${this.apiUrl}/images/article/${articleId}`;
    return this.http.get<ImageArticle[]>(url);
  }
}
