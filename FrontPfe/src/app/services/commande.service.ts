import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Commande from '../models/Commande.model';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private apiUrl = 'http://localhost:8081'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  saveCommande(orderData: any): Observable<any> {
    // Adjust the endpoint and HTTP method as needed
    const endpoint = `${this.apiUrl}/commande/addcommande`;
    return this.http.post(endpoint, orderData);
  }

  getCommandeById(idCommande: number): Observable<Commande> {
    const endpoint = `${this.apiUrl}/commande/${idCommande}`;
    return this.http.get<Commande>(endpoint);
  }

  getRecentOrders(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/commande/recent/${userId}`);
  }
}
