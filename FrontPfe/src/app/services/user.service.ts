import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import the tap operator
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8081';
  private idUser: number; // Store user ID here
  private userDataSubject = new BehaviorSubject<User>({} as User);
  userData$ = this.userDataSubject.asObservable();

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

  deleteUserById(idUser: number): Observable<string> {
    const url = `${this.apiUrl}/users/deleteUser/${idUser}`;

    return this.http.delete<string>(url);
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
  updateUserProfile(updatedUser: User, idUser: number): Observable<User> {
    console.log('updateuser', updatedUser.idUser);
    const url = `${this.apiUrl}/users/updateUser/${idUser}`;
    return this.http.put<User>(url, updatedUser).pipe(
      tap((updatedUserData) => {
        this.updateLocalStorage(updatedUserData); // Update local storage
        this.userDataSubject.next(updatedUserData); // Notify subscribers with updated user data
      })
    );
  }

  /*updateAddress(updatedAddressData: User, idUser: number): Observable<User> {
    const url = `${this.apiUrl}/users/updateAddress/${idUser}`;
    return this.http.put<User>(url, updatedAddressData).pipe(
      tap((updatedAddressData) => {
        this.updateLocalStorage(updatedAddressData); // Update local storage
        this.userDataSubject.next(updatedAddressData); // Notify subscribers with updated user data
      })
    );
  }*/

  updateLocalStorage(updatedUserData: User): void {
    // Get the current user data from local storage (if it exists)
    const currentUserDataString = localStorage.getItem('user');
    if (currentUserDataString) {
      const currentUserData = JSON.parse(currentUserDataString);

      // Merge the updated user data with the current user data (if needed)
      const updatedUserDataMerged = {
        ...currentUserData,
        ...updatedUserData,
      };

      // Store the updated user data in local storage
      localStorage.setItem('user', JSON.stringify(updatedUserDataMerged));
    }
  }

  getUsersByRole(roleName: string): Observable<User[]> {
    const url = `${this.apiUrl}/users/byRole/${roleName}`;
    return this.http.get<User[]>(url);
  }
}
