import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DeleteclientDialogComponent } from '../deleteclient-dialog/deleteclient-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
// clients.component.ts

// ... (imports and component decorator)
export class ClientsComponent implements OnInit {
  clients: User[] = [];
  keywordFilter: string = '';
  selectedPageSize: number = 7;
  emailFilter: string = '';
  displayedColumns: string[] = [
    'clientname',
    'email',
    'adresse',
    'region',
    'ville',
    'phone',
    'status',
    'actions',
  ];

  totalItems: number = 0;
  phoneFilter: string = '';

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>(this.clients);

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.clients);
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private userService: UserService, // Assuming you have a UserService
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.userService.getUsersByRole('Client').subscribe((data) => {
      console.log('Received data:', data);

      this.clients = data;

      // Apply filters
      let filteredClients = this.filterClients(data);

      this.clients = filteredClients;
      // Update the data source
      this.dataSource.data = this.clients;

      // Update totalItems for pagination
      this.totalItems = this.clients.length;

      // Update length property directly on the paginator
      this.paginator.length = this.totalItems;

      // Refresh the paginator
      this.paginator._changePageSize(this.paginator.pageSize);

      this.cdr.detectChanges();
    });
  }

  filterClients(clients: User[]): User[] {
    // Separate filters for name and phone
    const nameFilter = this.keywordFilter.toLowerCase();
    const phoneFilter = this.phoneFilter.toLowerCase();
    const emailFilter = this.emailFilter.toLowerCase();

    // Apply filters based on name and phone
    return clients.filter((client) => {
      const nameMatches =
        client.fName.toLowerCase().includes(nameFilter) ||
        client.lName.toLowerCase().includes(nameFilter);

      const phoneMatches = client.phone
        .toString()
        .toLowerCase()
        .includes(phoneFilter);

      const EmailMatches = client.email
        .toString()
        .toLowerCase()
        .includes(emailFilter);

      return nameMatches && phoneMatches && EmailMatches;
    });
  }

  onPageChange(event: PageEvent): void {
    this.selectedPageSize = event.pageSize;
  }

  resetFilters() {
    this.keywordFilter = '';
    this.phoneFilter = '';
    this.emailFilter = '';
    this.loadClients();
  }

  openDeleteConfirmationDialog(idUser: number): void {
    const dialogRef = this.dialog.open(DeleteclientDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call the deleteUserById method when confirmed
        this.userService.deactivateUserById(idUser).subscribe(
          () => {
            // Reload the clients or update the data source as needed
            this.loadClients();
          },
          (error) => {
            console.error('Error deleting client:', error);
          }
        );
      }
    });
  }

  navigateToAddClientPage() {
    this.router.navigate(['/ajout-cliente']);
  }
}
