import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ajoutvendeuse',
  templateUrl: './ajoutvendeuse.component.html',
  styleUrls: ['./ajoutvendeuse.component.css'],
})
export class AjoutvendeuseComponent {
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('ConfirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
    }

    return null;
  }

  showEmailExistsError: boolean = false;
  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  registerForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      ConfirmPassword: new FormControl('', [Validators.required]),
      lName: new FormControl('', Validators.required),
      fName: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
    },
    { validators: this.passwordMatchValidator }
  );
  showPasswordMismatchMessage: boolean = false;

  onCreateAccountClick() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      // Proceed with registration
      this.userService.registerVendeuse(user).subscribe(
        (registeredVendeuse) => {
          // Handle successful registration
          console.log('User registered successfully:', registeredVendeuse);

          this.router.navigate(['/acceuildashboard']);
        },
        (error) => {
          if (error.status === 409) {
            // If the email already exists, set showEmailExistsError to true
            this.showEmailExistsError = true;
          } else {
            // Handle other registration errors
            console.error('Error during registration:', error);
          }
          // Handle registration error
          console.error('Error during registration:', error);
        }
      );
    }
  }

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}
}
