import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  user: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private cartservice: CartService
  ) {}

  ngOnInit(): void {
    // Retrieve user information from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  // Other component logic goes here

  logout() {
    // console.log(this.user.idUser);

    // Clear the user's cart when logging out
    this.cartservice.clearCart();
    this.userService.logout();
    this.router.navigate(['/acceuil']);
  }
}
