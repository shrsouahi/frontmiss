import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FrontPfe';

  shouldDisplayMenubarAndFooter(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // Check if the user is null or has the role 'Client'
    return {} || (user.roleUser && user.roleUser.roleName === 'Client');
  }

  DashboardAdminstration(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Check if user is defined and has the expected structure
    if (user && user.roleUser && user.roleUser.roleName) {
      // Check if the user has the role 'Vendeuse' or 'Admin'
      return (
        user.roleUser.roleName === 'Vendeuse' ||
        user.roleUser.roleName === 'Admin'
      );
    }

    return false; // Return false if user or role information is missing
  }
}
