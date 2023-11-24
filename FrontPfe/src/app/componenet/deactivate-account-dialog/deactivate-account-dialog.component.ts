import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-deactivate-account-dialog',
  templateUrl: './deactivate-account-dialog.component.html',
  styleUrls: ['./deactivate-account-dialog.component.css'],
})
export class DeactivateAccountDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeactivateAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeactivateClick(): void {
    const idUser = this.data?.seller?.idUser;
    if (idUser) {
      this.deactivateUser(idUser);
    }
  }

  deactivateUser(idUser: number): void {
    this.userService.deactivateUserById(idUser).subscribe(
      () => {
        console.log('seller deactivated successfully.');
        this.snackBar.open(
          'La désactivation est effectuée avec succès',
          'Fermer',
          {
            duration: 3000,
            panelClass: 'success-snackbar',
          }
        );
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error deactivating seller:', error);
      }
    );
  }
}
