import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Commande from 'src/app/models/Commande.model';
import OrderStatus from 'src/app/models/OrderStatus.model';
import { CommandeService } from 'src/app/services/commande.service';
import { QuantityOrderService } from 'src/app/services/quantity-order.service';
import { QuantitySizeService } from 'src/app/services/quantity-size.service';

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
    private route: ActivatedRoute,
    private quantityOrder: QuantityOrderService,
    private quantitySizeService: QuantitySizeService
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

        // If the new status is 'Annulée', update the quantities in stock
        if (newStatus === OrderStatus.Annulée) {
          this.updateQuantitiesForCanceledOrder(idCommande);
        }

        this.loadOrders();
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }

  private updateQuantitiesForCanceledOrder(idCommande: number): void {
    // Retrieve the quantity orders for the specific commande
    this.quantityOrder.getQuantityOrdersByCommandeId(idCommande).subscribe(
      (quantityOrders) => {
        // Iterate through the quantity orders and update the quantities
        quantityOrders.forEach((quantityOrder) => {
          this.quantitySizeService
            .getAvailableSizesForArticle(quantityOrder.article.idArticle)
            .subscribe(
              (availableSizes) => {
                // Find the quantity size that matches the selected size in the quantity order
                const selectedSize = availableSizes.find(
                  (size) => size.size.labelSize === quantityOrder.selectedSize
                );

                // If the selected size is found, update its quantity
                if (selectedSize) {
                  const updatedQuantity =
                    selectedSize.quantityStockArticle + quantityOrder.quantity;

                  // Update the quantity size with the calculated value
                  this.quantitySizeService
                    .updateQuantitySize({
                      idArticle: quantityOrder.article.idArticle,
                      labelSize: quantityOrder.selectedSize,
                      quantity: updatedQuantity,
                    })
                    .subscribe(
                      (response) => {
                        console.log(
                          'QuantitySize updated successfully:',
                          response
                        );
                      },
                      (error) => {
                        console.error('Error updating QuantitySize:', error);
                      }
                    );
                } else {
                  console.warn(
                    `Selected size '${quantityOrder.selectedSize}' not found for article '${quantityOrder.article.idArticle}'.`
                  );
                }
              },
              (error) => {
                console.error('Error retrieving available sizes:', error);
              }
            );
        });
      },
      (error) => {
        console.error('Error retrieving quantity orders:', error);
      }
    );
  }
  getStatusChipStyle(status: OrderStatus): any {
    switch (status) {
      case OrderStatus.Créée:
        return { 'background-color': '#4caf50', color: 'black !important' }; // Green color for 'Créée' status
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
