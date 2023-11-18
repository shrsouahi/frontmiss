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
  selectedPageSize = 3;

  // Add a property for the order statuses
  orderStatuses = Object.values(OrderStatus);

  // Add any additional filters for orders as needed

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
    // Apply filters based on keyword and other criteria
    // You can extend this method based on your needs
    return commandes.filter((commandes) => {
      const matchesKeyword = commandes.reference
        .toLowerCase()
        .includes(this.keywordFilter.toLowerCase());
      // Add other filter conditions as needed

      return matchesKeyword; // Add other conditions as needed
    });
  }

  onPageChange(event: PageEvent): void {}

  resetFilters() {
    this.keywordFilter = '';
    // Reset other filters if needed
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
}
