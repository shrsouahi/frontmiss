import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  user: User = new User(); // Assign an initial value

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    // Initialize the form and set validators
    this.editProfileForm = this.formBuilder.group({
      name: [{ value: this.user.fName }, Validators.required],
      lastname: [{ value: this.user.lName }, Validators.required],
      email: [
        { value: this.user.email, disabled: true },
        [Validators.required, Validators.email],
      ],
      phoneNumber: [this.user.phone],
      password: [this.user.password, Validators.required],
      Confirmpassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Fetch user data from the service
    this.userService.getUserById(this.userService.getUserId()).subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  onSubmit() {
    // Handle the form submission here
  }
}
