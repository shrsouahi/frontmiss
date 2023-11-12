// CommandeModel.ts

import { OrderStatus } from './OrderStatus.model';
import { QuantityOrder } from './QuantityOrder.model';
import { User } from './User.model';

export class Commande {
  idCommande: number;
  reference: string;
  status: OrderStatus;
  total: number;
  orderDate: String;
  shippingMethod: string;
  quantityOrders: QuantityOrder[];
  user: User; // Add the user property

  constructor(
    idCommande: number,
    reference: string,
    status: OrderStatus,
    total: number,
    orderDate: String,
    shippingMethod: string,
    quantityOrders: QuantityOrder[],
    user: User
  ) {
    this.idCommande = idCommande;
    this.reference = reference;
    this.status = status;
    this.total = total;
    this.orderDate = orderDate;
    this.shippingMethod = shippingMethod;
    this.quantityOrders = quantityOrders;
    this.user = user;
  }

  getStatusLabel(): string {
    return this.status; // Accessing the enum directly
  }
}

export default Commande;
