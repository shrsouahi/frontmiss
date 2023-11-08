// edit-profile-modal.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.css'],
})
export class EditProfileModalComponent {
  editProfileForm: FormGroup;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<EditProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService,
    private httpClient: HttpClient
  ) {
    this.user = data; // Initialize user data from the injected data

    // Initialize your form controls here

    this.editProfileForm = this.fb.group({
      name: [this.user.fName, Validators.required], // Add Validators.required
      lastname: [this.user.lName, Validators.required], // Add Validators.required
      email: [{ value: this.user.email, disabled: true }],
      phoneNumber: [this.user.phone, Validators.required], // Add Validators.required
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    const updatedUserData: User = {
      idUser: this.user.idUser,
      fName: this.editProfileForm.value.name,
      lName: this.editProfileForm.value.lastname,
      phone: this.editProfileForm.value.phoneNumber,
      email: this.user.email,
      password: this.user.password,
    };

    this.userService
      .updateUserProfile(updatedUserData, this.user.idUser) // Pass the user ID in the function call
      .subscribe(
        (result) => {
          console.log('User updated:', result);
          this.dialogRef.close(updatedUserData);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
  }
}
