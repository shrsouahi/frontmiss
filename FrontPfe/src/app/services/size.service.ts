import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Size } from '../models/Size.model';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getAllSizes(): Observable<Size[]> {
    const url = `${this.apiUrl}/sizes/all`;
    return this.http.get<Size[]>(url);
  }
}
