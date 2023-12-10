import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Commande from 'src/app/models/Commande.model';
import OrderStatus from 'src/app/models/OrderStatus.model';
import QuantityOrder from 'src/app/models/QuantityOrder.model';
import { CommandeService } from 'src/app/services/commande.service';
import { QuantityOrderService } from 'src/app/services/quantity-order.service';

@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.component.html',
  styleUrls: ['./details-commande.component.css'],
})
export class DetailsCommandeComponent implements OnInit {
  commandeId!: number;
  quantityOrders!: QuantityOrder[];
  commande!: Commande;
  displayedColumns: string[] = [
    'articleName',
    'taille',
    'quantity',
    'price',
    'priceTotal',
  ];
  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeService,
    private quantityOrderService: QuantityOrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.commandeId = params['idCommande'];
      this.loadCommandeDetails();
      this.getCommandeById();
    });
  }

  loadCommandeDetails() {
    this.quantityOrderService
      .getQuantityOrdersByCommandeId(this.commandeId)
      .subscribe(
        (data) => {
          this.quantityOrders = data;
          console.log('data', data);
        },
        (error) => {
          console.error('Error fetching quantity orders:', error);
        }
      );
  }

  getCommandeById() {
    this.commandeService.getCommandeById(this.commandeId).subscribe(
      (data) => {
        this.commande = data;
        console.log('data', data);
      },
      (error) => {
        console.error('Error fetching commande;', error);
      }
    );
  }
  // Inside your DetailsCommandeComponent class
  /*calculateTotalPrice(quantityOrder: QuantityOrder): string {
    if (
      quantityOrder &&
      quantityOrder.article &&
      quantityOrder.article.prixArticle &&
      quantityOrder.quantity
    ) {
      const totalPrice =
        quantityOrder.article.prixArticle * quantityOrder.quantity;

      if (!isNaN(totalPrice)) {
        return totalPrice + ' TND';
      } else {
        console.error('Invalid quantityOrder:', quantityOrder);
        return '';
      }
    }
    return '';
  }*/

  calculateTotalPrice(quantityOrder: QuantityOrder): number {
    const price =
      quantityOrder.article.prixSolde !== null
        ? quantityOrder.article.prixSolde
        : quantityOrder.article.prixArticle;

    const totalPrice = price * quantityOrder.quantity;

    return totalPrice;
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
}
