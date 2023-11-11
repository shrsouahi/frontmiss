import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
