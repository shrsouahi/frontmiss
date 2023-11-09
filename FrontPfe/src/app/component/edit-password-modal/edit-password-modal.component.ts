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
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.user = data; // User data is passed to the modal
    // Initialize your password change form controls here
    this.editPasswordForm = this.fb.group({
      pwd: ['', [Validators.required]],
      pwdnew: ['', [Validators.required, Validators.minLength(8)]],
      confirmPwd: ['', [Validators.required, Validators.minLength(8)]],
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

      // Fetch the user's data
      this.userService.getUserById(this.user.idUser).subscribe((user) => {
        if (user && user.password === oldPassword) {
          // Old password is correct
          if (newPassword === confirmPassword) {
            // Passwords match, proceed with the update
            user.password = newPassword; // Set the new password
            this.userService.updateUserProfile(user, user.idUser).subscribe(
              (result) => {
                console.log('Password updated:', result);
                this.dialogRef.close(result);
              },
              (error) => {
                console.error('Error updating password:', error);
                // Handle the error, e.g., display an error message
              }
            );
          } else {
            // Passwords don't match
            this.editPasswordForm
              .get('confirmPwd')!
              .setErrors({ passwordMismatch: true });
          }
        } else {
          // Old password is incorrect
          this.editPasswordForm
            .get('pwd')!
            .setErrors({ incorrectPassword: true });
        }
      });
    }
  }
}
