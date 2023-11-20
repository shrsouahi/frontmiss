import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import QuantityOrder from '../models/QuantityOrder.model';

@Injectable({
  providedIn: 'root',
})
export class QuantityOrderService {
  private apiUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) {}

  getQuantityOrdersByCommandeId(
    idCommande: number
  ): Observable<QuantityOrder[]> {
    return this.http.get<QuantityOrder[]>(
      `${this.apiUrl}/quantityorder/${idCommande}`
    );
  }
}
