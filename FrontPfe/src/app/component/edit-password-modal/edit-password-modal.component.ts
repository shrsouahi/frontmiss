import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.css'],
})
export class EditPasswordModalComponent {
  editPasswordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // You can pass any necessary data here
    private fb: FormBuilder
  ) {
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
    // Handle the password change action here
    if (this.editPasswordForm.valid) {
      const passwordData = this.editPasswordForm.value;
      // You can implement the logic to change the password here
      this.dialogRef.close(passwordData);
    }
  }
}
