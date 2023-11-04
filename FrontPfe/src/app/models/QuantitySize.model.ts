import { Article } from './Article.model';
import { Size } from './Size.model';

export class QuantitySize {
  id: number;
  article: Article;
  size: Size;
  quantityStockArticle: number;

  constructor(
    id: number,
    article: Article,
    size: Size,
    quantityStockArticle: number
  ) {
    this.id = id;
    this.article = article;
    this.size = size;
    this.quantityStockArticle = quantityStockArticle;
  }
}
