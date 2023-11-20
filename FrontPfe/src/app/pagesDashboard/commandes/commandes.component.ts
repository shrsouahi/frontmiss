import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Commande from 'src/app/models/Commande.model';
import OrderStatus from 'src/app/models/OrderStatus.model';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css'],
})
export class CommandesComponent {
  orders: Commande[] = [];
  keywordFilter: string = '';
  referenceFilter: string = '';
  //dateFilter!: Date;
  statusFilter: OrderStatus | null = null;
  selectedPageSize = 5;

  // property for the order statuses
  orderStatuses = Object.values(OrderStatus);

  displayedColumns: string[] = [
    'reference',
    'orderDate',
    'user',
    'total',
    'shippingMethod',
    'status',
    'statusChange',
    'details',
  ];

  totalItems: number = 0;

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Commande>(this.orders);

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private commandeService: CommandeService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.commandeService.getAllOrders().subscribe((data) => {
      this.orders = data;

      // Apply filters
      let filteredOrders = this.filterOrders(data);

      this.orders = filteredOrders;
      this.dataSource.data = this.orders;
      this.totalItems = this.orders.length;
      this.paginator.length = this.totalItems;
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

  filterOrders(commandes: Commande[]): Commande[] {
    return commandes.filter((commandes) => {
      const matchesKeyword = `${commandes.user.fName} ${commandes.user.lName}`
        .toLowerCase()
        .includes(this.keywordFilter.toLowerCase());

      const matchesReference = commandes.reference
        .toLowerCase()
        .includes(this.referenceFilter.toLowerCase());

      const matchesStatus =
        !this.statusFilter || commandes.status === this.statusFilter;

      return matchesKeyword && matchesReference && matchesStatus;
    });
  }

  onPageChange(event: PageEvent): void {
    this.selectedPageSize = event.pageSize;
  }

  resetFilters() {
    this.keywordFilter = '';
    this.referenceFilter = '';
    this.statusFilter = null;
    this.loadOrders();
  }

  onStatusChange(event: MatSelectChange, order: Commande): void {
    const newStatus = event.value;
    this.updateOrderStatus(order.idCommande, newStatus);
  }
  updateOrderStatus(idCommande: number, newStatus: string): void {
    this.commandeService.updateOrderStatus(idCommande, newStatus).subscribe(
      (response) => {
        console.log('Order status updated successfully:', newStatus);
        this.loadOrders();
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }
  getStatusChipStyle(status: OrderStatus): any {
    switch (status) {
      case OrderStatus.Créée:
        return { 'background-color': '#4caf50', color: 'black' }; // Green color for 'Créée' status
      case OrderStatus.Validée:
        return { 'background-color': '#2196f3', color: 'black' }; // Blue color for 'Validée' status
      case OrderStatus.Expédiée:
        return { 'background-color': '#ff9800', color: 'black' }; // Orange color for 'Expédiée' status
      case OrderStatus.Livrée:
        return { 'background-color': '#ffeb3b', color: 'black' }; // yellow color for 'Livrée' status
      case OrderStatus.Annulée:
        return { 'background-color': '#f44336', color: 'black' }; // Red color for 'Annulée' status
      default:
        return {};
    }
  }
  navigateToDetails(idCommande: number): void {
    // Navigate to the details page with the commande ID
    this.router.navigate(['/commande-details', idCommande]);
  }
}
