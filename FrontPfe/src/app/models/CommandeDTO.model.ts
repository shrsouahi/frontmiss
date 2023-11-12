import { User } from './User.model';

// commande-dto.model.ts
export class CommandeDTO {
  reference: string;
  total: number;
  orderDate: string;
  shippingMethod: string;
  status: string;
  user: User;

  constructor(
    reference: string,
    total: number,
    orderDate: string,
    shippingMethod: string,
    status: string,
    user: User
  ) {
    this.reference = reference;
    this.total = total;
    this.orderDate = orderDate;
    this.shippingMethod = shippingMethod;
    this.status = status;
    this.user = user;
  }
}
