import { Article } from "./Article.model";
import { Commande } from "./Commande.model";

export class QuantityOrder {
  idQuantity: number;
  article: Article;
  commande: Commande;
  quantity: number;
  selectedSize: string;

  constructor(
    idQuantity: number,
    article: Article,
    quantity: number,
    selectedSize: string,
    commande: Commande
  ) {
    this.idQuantity = idQuantity;
    this.article = article;
    this.quantity = quantity;
    this.selectedSize = selectedSize;
    this.commande = commande;
  }
}

export default QuantityOrder;
