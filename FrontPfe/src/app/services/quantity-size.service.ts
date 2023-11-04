import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuantitySize } from '../models/QuantitySize.model';

@Injectable({
  providedIn: 'root',
})
export class QuantitySizeService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getAvailableSizesForArticle(articleId: number): Observable<QuantitySize[]> {
    const url = `${this.baseUrl}/quantitysizes/article/${articleId}`;

    return this.http.get<QuantitySize[]>(url);
  }
}
