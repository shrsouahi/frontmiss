// commande-dto.model.ts
export class CommandeDTO {
  reference: string;
  total: number;
  orderDate: string;
  shippingMethod: string;
  status: string;

  constructor(
    reference: string,
    total: number,
    orderDate: string,
    shippingMethod: string,
    status: string
  ) {
    this.reference = reference;
    this.total = total;
    this.orderDate = orderDate;
    this.shippingMethod = shippingMethod;
    this.status = status;
  }
}
