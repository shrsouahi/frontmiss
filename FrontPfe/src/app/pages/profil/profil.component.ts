import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit(): void {}

  // Other component logic goes here

  logout() {
    this.userService.logout(); // Call the logout method from the user service
  }
}
