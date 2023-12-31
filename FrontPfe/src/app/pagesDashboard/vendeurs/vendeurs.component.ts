import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeactivateAccountDialogComponent } from 'src/app/componenet/deactivate-account-dialog/deactivate-account-dialog.component';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';
import { UpdateSellerDialogComponent } from '../update-seller-dialog/update-seller-dialog.component';

@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.css'],
})
export class VendeursComponent implements OnInit {
  sellers: User[] = [];
  displayedColumns: string[] = [
    'sellername',
    'email',
    'adresse',
    'region',
    'ville',
    'phone',
    'status',
    'actions',
  ];

  dataSource = new MatTableDataSource<User>(this.sellers);

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  openUpdateSellerDialog(seller: User): void {
    const dialogRef = this.dialog.open(UpdateSellerDialogComponent, {
      width: '500px',
      data: { seller },
    });

    // Subscribe to the afterClosed event to handle the result when the dialog is closed
    dialogRef.afterClosed().subscribe((updatedSeller) => {
      if (updatedSeller) {
        // Update the table data
        const index = this.sellers.findIndex(
          (s) => s.idUser === updatedSeller.idUser
        );
        if (index !== -1) {
          // Update the specific item in the data source
          this.dataSource.data[index] = updatedSeller;

          // Trigger change detection to reflect the changes in the table
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadSellers();
  }
  loadSellers() {
    // Call your user service to retrieve sellers with role "Vendeuse"
    this.userService.getAllSellers().subscribe((data) => {
      // Update the status for each seller
      this.sellers = data.map((seller) => ({
        ...seller,
        status: seller.valide ? 'Active' : 'Désactivé',
      }));

      // Update the data source
      this.dataSource.data = this.sellers;
    });
  }
  navigateToAddSellerPage() {
    this.router.navigate(['/ajout-vendeuse']);
  }

  openDeactivateAccountDialog(seller: any): void {
    const dialogRef = this.dialog.open(DeactivateAccountDialogComponent, {
      width: '400px',
      data: { seller },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result if needed
      console.log('The dialog was closed');
    });
  }
}
