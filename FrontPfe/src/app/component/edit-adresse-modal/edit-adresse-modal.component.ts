import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-adresse-modal',
  templateUrl: './edit-adresse-modal.component.html',
  styleUrls: ['./edit-adresse-modal.component.css'],
})
export class EditAddressModalComponent {
  editAdresseForm: FormGroup; // Make sure to use the correct form group name
  addressData: any; // Update the type as per your requirements
  user: User;

  constructor(
    public dialogRef: MatDialogRef<EditAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService,
    private httpClient: HttpClient
  ) {
    this.user = data; // Initialize user data from the injected data
    this.addressData = data; // Initialize address data from the injected data
    // Initialize your address form controls here
    this.editAdresseForm = this.fb.group({
      adresse: [this.addressData.adresse, Validators.required],
      region: [this.addressData.region, Validators.required],
      ville: [this.addressData.ville, Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    const updatedUserData: User = {
      idUser: this.user.idUser,
      fName: this.user.fName,
      lName: this.user.lName,
      phone: this.user.phone,
      email: this.user.email,
      password: this.user.password,
      adresse: this.editAdresseForm.value.adresse,
      region: this.editAdresseForm.value.region,
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
