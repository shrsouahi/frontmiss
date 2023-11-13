import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  shouldDisplayFooter(): boolean {
    const user = this.userService.getUserFromLocalStorage();
    return !user || (user.roleUser && user.roleUser.roleName === 'Client');
  }
}
