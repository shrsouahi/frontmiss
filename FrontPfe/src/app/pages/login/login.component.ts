import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  showErrorMessage = false;

  emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  loginForm: FormGroup = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private router: Router, private userservice: UserService) {}

  ngOnInit(): void {
    //Check if the user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
      //User is already logged in ,redirect to the Home page
      this.router.navigate(['/acceuil']);
    }
  }

  signIn() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userservice.signIn(email, password).subscribe(
        (registeredUser) => {
          if (registeredUser) {
            this.userservice.setUserId(registeredUser.idUser);
            console.log('User logged in successfully:', registeredUser);

            // After successful authentication:
            this.userservice
              .signIn(email, password)
              .subscribe((registeredUser: any) => {
                const userEmail = registeredUser.email;
                const userPassword = registeredUser.password;
                const userId = registeredUser.idUser;
                const userFname = registeredUser.fName;
                const userAdresse = registeredUser.adresse;
                const userRegion = registeredUser.region;
                const userVille = registeredUser.ville;
                const userPhone = registeredUser.phone;
              });

            // Serialize the user object to JSON
            const userJSON = JSON.stringify(registeredUser);

            // Store the serialized user information in local storage
            localStorage.setItem('user', userJSON);
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['/acceuil']);
          } else {
            console.error('Authentication failed');
            this.showErrorMessage = true;
            console.log('showErrorMessage is true:', this.showErrorMessage);
          }
        },
        (error) => {
          console.error('Error during authentication:', error);
        }
      );
    }
  }
}
