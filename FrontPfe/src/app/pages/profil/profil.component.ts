import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditAddressModalComponent } from 'src/app/component/edit-adresse-modal/edit-adresse-modal.component';
import { EditPasswordModalComponent } from 'src/app/component/edit-password-modal/edit-password-modal.component';
import { EditProfileModalComponent } from 'src/app/component/edit-profile-modal/edit-profile-modal.component';
import { User } from 'src/app/models/User.model';
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
    private cartservice: CartService,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // Subscribe to the user data observable
    this.userService.userData$.subscribe((userData) => {
      this.user = userData; // Update the local user property with the new data
    });

    const userJSON = localStorage.getItem('user'); // Retrieve the user object from local storage
    if (userJSON) {
      const user = JSON.parse(userJSON); // Parse the user object from JSON

      if (user.idUser) {
        // Fetch the user's data from the backend using the user's id
        this.userService.getUserById(user.idUser).subscribe(
          (userData) => {
            this.user = userData; // Update the local user property with the new data
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
      } else {
        console.error('User ID not found in the user object in local storage');
      }
    } else {
      console.error('User object not found in local storage');
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

  openEditProfileModal() {
    const dialogRef = this.dialog.open(EditProfileModalComponent, {
      width: '500px',
      data: this.user,
    });
  }

  openEditPasswordModal() {
    const dialogRef = this.dialog.open(EditPasswordModalComponent, {
      width: '500px',
      data: this.user,
    });
  }

  openEditAdresseModal() {
    const dialogRef = this.dialog.open(EditAddressModalComponent, {
      width: '500px',
      data: this.user,
    });
  }
}
