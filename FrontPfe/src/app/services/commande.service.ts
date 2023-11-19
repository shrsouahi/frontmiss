import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import Commande from '../models/Commande.model';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private apiUrl = 'http://localhost:8081'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  saveCommande(orderData: any): Observable<any> {
    const endpoint = `${this.apiUrl}/commande/addcommande`;
    return this.http.post(endpoint, orderData);
  }

  getCommandeById(idCommande: number): Observable<Commande> {
    const endpoint = `${this.apiUrl}/commande/${idCommande}`;
    return this.http.get<Commande>(endpoint);
  }

  getRecentOrders(idUser: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/commande/recent/${idUser}`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/commande/all`);
  }

  updateOrderStatus(idCommande: number, newStatus: string): Observable<any> {
    const endpoint = `${this.apiUrl}/commande/${idCommande}/status`;
    const params = new HttpParams().set('newStatus', newStatus);

    return this.http.put(endpoint, {}, { params, responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error updating order status:', error);
        throw error;
      })
    );
  }
}
