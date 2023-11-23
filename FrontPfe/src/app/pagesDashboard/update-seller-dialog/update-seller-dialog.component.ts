import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-seller-dialog',
  templateUrl: './update-seller-dialog.component.html',
  styleUrls: ['./update-seller-dialog.component.css'],
})
export class UpdateSellerDialogComponent {
  registerForm: FormGroup;
  hide = true;
  hideConfirmPassword = true;
  showEmailExistsError = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateSellerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { seller: User },
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      // ... existing form controls ...

      // Initialize form controls with the data received
      lName: [data.seller.lName, Validators.required],
      fName: [data.seller.fName, Validators.required],
      email: [data.seller.email, [Validators.required, Validators.email]],
      phone: [data.seller.phone, Validators.required],
      adresse: [data.seller.adresse, Validators.required],
      region: [data.seller.region, Validators.required],
      ville: [data.seller.ville, Validators.required],
      password: [data.seller.password, Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onUpdateClick(): void {
    if (!this.registerForm.valid) {
      console.log('Form is not valid');
      return;
    }
    if (this.registerForm.valid) {
      const updatedUser: User = this.registerForm.value;
      const idUser = this.data.seller.idUser;

      this.userService.updateUserSeller(updatedUser, idUser).subscribe(
        (result) => {
          console.log('seller updated successfully', result);
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error updating seller', error);
        }
      );
    }
  }
}
