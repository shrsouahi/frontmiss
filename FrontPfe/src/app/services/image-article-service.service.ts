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

  getImagesForArticle(idArticle: number): Observable<ImageArticle[]> {
    const url = `${this.apiUrl}/images/article/${idArticle}`;
    return this.http.get<ImageArticle[]>(url);
  }

  addImageForArticle(
    idArticle: number,
    imageUrl: string
  ): Observable<ImageArticle> {
    const url = `${
      this.apiUrl
    }/images/add?idArticle=${idArticle}&imageUrl=${encodeURIComponent(
      imageUrl
    )}`;
    return this.http.post<ImageArticle>(url, {});
  }
}
