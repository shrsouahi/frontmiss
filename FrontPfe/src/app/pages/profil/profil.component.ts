import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  user: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve user information from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  // Other component logic goes here

  logout() {
    this.userService.logout();
    this.router.navigate(['/acceuil']);
  }
}
