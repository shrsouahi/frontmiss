import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8081';

  private idUser: number; // Store user ID here

  setUserId(idUser: number) {
    this.idUser = idUser;
  }

  getUserId(): number {
    return this.idUser;
  }

  constructor(private http: HttpClient) {
    this.idUser = 0;
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/adduser`, user);
  }

  signIn(email: string, password: string): Observable<User> {
    // Send a POST request with the email and password in the request body
    const user = { email: email, password: password };
    return this.http.post<User>(`${this.apiUrl}/users/signin`, user);
  }

  checkEmailExists(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/users/checkemailexists`, {
      email,
    });
  }

  logout() {
    localStorage.removeItem('user'); // Remove user data
    localStorage.removeItem('isLoggedIn'); // Remove the "isLoggedIn" flag
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserFromLocalStorage(): User | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  getUserById(idUser: number): Observable<User> {
    const url = `${this.apiUrl}/users/user/${idUser}`; // Construct the URL here
    return this.http.get<User>(url);
  }
  // method to update the user's profile
  updateUserProfile(updatedUser: User): Observable<User> {
    const url = `${this.apiUrl}/users/updateUser/${this.idUser}`; // Assuming your API endpoint
    return this.http.put<User>(url, updatedUser);
  }
}
