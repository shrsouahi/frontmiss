import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.css'],
})
export class EditPasswordModalComponent {
  editPasswordForm: FormGroup;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<EditPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, // You can pass any necessary data here
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.user = data; // User data is passed to the modal
    // Initialize your password change form controls here
    this.editPasswordForm = this.fb.group({
      pwd: ['', [Validators.required]],
      pwdnew: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editPasswordForm.valid) {
      const oldPassword = this.editPasswordForm.get('pwd')!.value;
      const newPassword = this.editPasswordForm.get('pwdnew')!.value;
      const confirmPassword = this.editPasswordForm.get('confirmPwd')!.value;

      // Verify the old password
      if (oldPassword !== this.user.password) {
        // Old password doesn't match
        // Display an error message
        this.editPasswordForm
          .get('pwd')!
          .setErrors({ incorrectPassword: true });
        return;
      }

      // Verify that the new password and confirmation match
      if (newPassword !== confirmPassword) {
        // Passwords don't match
        // Display an error message
        this.editPasswordForm
          .get('confirmPwd')!
          .setErrors({ passwordMismatch: true });
        return;
      }

      // If old password is correct and new password matches confirmation, update the password
      this.user.password = newPassword; // Set the new password
      this.userService
        .updateUserProfile(this.user, this.user.idUser) // Send a PUT request to update the user's password
        .subscribe(
          (result) => {
            console.log('Password updated:', result);
            this.dialogRef.close(result);
          },
          (error) => {
            console.error('Error updating password:', error);
            // Handle the error, e.g., display an error message
          }
        );
    }
  }
}
