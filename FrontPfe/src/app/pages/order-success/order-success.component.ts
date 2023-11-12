import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/models/Commande.model';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  idCommande!: number;
  commande!: Commande;
  userFName!: string;
  deliveryCost: number = 0; // Initialize deliveryCost to 0

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    console.log('Commande:', this.commande);
    if (this.commande?.quantityOrders) {
      console.log('Quantity Orders:', this.commande.quantityOrders);
    }
    this.idCommande = +localStorage.getItem('idCommande')! || 0;
    // Fetch Commande details using the service
    this.commandeService.getCommandeById(this.idCommande).subscribe(
      (commande) => {
        this.commande = commande;

        console.log('Commande:', this.commande);
        if (this.commande?.quantityOrders) {
          console.log('Quantity Orders:', this.commande.quantityOrders);
        }

        // Retrieve user's first name from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          this.userFName = user.fName;
        }

        // Calculate deliveryCost based on deliveryChoice
        if (this.commande.shippingMethod === 'boutique') {
          this.deliveryCost = 0;
        } else if (this.commande.shippingMethod === 'à domicile') {
          this.deliveryCost = 7;
        }
      },
      (error) => {
        console.error('Error fetching Commande details:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Clear idCommande from localStorage when leaving the page
    localStorage.removeItem('idCommande');
  }
}
