// CommandeModel.ts

import { OrderStatus } from './OrderStatus.model';
import { QuantityOrder } from './QuantityOrder.model';

export class Commande {
  idCommande: number;
  reference: string;
  status: OrderStatus;
  total: number;
  orderDate: String;
  shippingMethod: string;
  quantityOrders: QuantityOrder[];

  constructor(
    idCommande: number,
    reference: string,
    status: OrderStatus,
    total: number,
    orderDate: String,
    shippingMethod: string,
    quantityOrders: QuantityOrder[]
  ) {
    this.idCommande = idCommande;
    this.reference = reference;
    this.status = status;
    this.total = total;
    this.orderDate = orderDate;
    this.shippingMethod = shippingMethod;
    this.quantityOrders = quantityOrders;
  }

  getStatusLabel(): string {
    return this.status; // Accessing the enum directly
  }
}

export default Commande;
