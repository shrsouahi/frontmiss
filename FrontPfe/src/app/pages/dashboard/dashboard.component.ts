import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  opened = false;
  //isAdmin: boolean = this.DashboardAdminstration(); // Initial value based on the current user

  constructor(
    private userservice: UserService,
    private router: Router,
    private cartservice: CartService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.cartservice.clearCart();
    //localStorage.removeItem('isLoggedIn');
    this.userservice.logout();
    //this.isAdmin = false; // Set isAdmin to false on logout
    this.router.navigate(['/acceuil']);
  }

  DashboardAdminstration(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // Check if user is defined and has the expected structure
    if (user && user.roleUser) {
      // Check if the user has the role 'Vendeuse' or 'Admin'
      return user.roleUser.idRole === 2 || user.roleUser.idRole === 3;
    }

    return false; // Return false if user or role information is missing
  }

  isVendeure(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.roleUser) {
      return user.roleUser.idRole === 2;
    }
    return false;
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // Check if the user is adminstartor(proprétaire de boutique)
    return user.roleUser.idRole === 3;
  }
}
