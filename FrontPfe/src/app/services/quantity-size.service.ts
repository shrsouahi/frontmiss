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

  getAvailableSizesForArticle(idArticle: number): Observable<QuantitySize[]> {
    const url = `${this.baseUrl}/quantitysizes/article/${idArticle}`;
    return this.http.get<QuantitySize[]>(url);
  }

  createQuantitySize(data: {
    idArticle: number;
    labelSize: string;
    quantity: number;
  }): Observable<QuantitySize> {
    const url = `${this.baseUrl}/quantitysizes/addQuantity`;
    const params = {
      idArticle: data.idArticle.toString(),
      labelSize: data.labelSize.toString(),
      quantity: data.quantity.toString(),
    };
    return this.http.post<QuantitySize>(url, null, { params });
  }

  updateQuantitySize(data: {
    idArticle: number;
    labelSize: string;
    quantity: number;
  }): Observable<QuantitySize> {
    const url = `${this.baseUrl}/quantitysizes/update`;

    const params = {
      idArticle: data.idArticle.toString(),
      labelSize: data.labelSize.toString(),
      quantity: data.quantity.toString(),
    };

    return this.http.put<QuantitySize>(url, null, { params });
  }
}
