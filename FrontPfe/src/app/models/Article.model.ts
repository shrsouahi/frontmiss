// article.model.ts

import { Category } from './Category.model';
import { ImageArticle } from './ImageArticle.model';

export class Article {
  idArticle: number;
  bareCode: number;
  nomArticle: string;
  descriptionArticle: string;
  prixArticle: number;
  prixSolde: number;
  quantiteStock: number;
  categories: Category[];
  images: ImageArticle[];

  constructor(
    idArticle: number,
    bareCode: number,
    nomArticle: string,
    descriptionArticle: string,
    prixArticle: number,
    prixSolde: number,
    quantiteStock: number,
    categories: Category[],
    images: ImageArticle[]
  ) {
    this.idArticle = idArticle;
    this.bareCode = bareCode;
    this.nomArticle = nomArticle;
    this.descriptionArticle = descriptionArticle;
    this.prixArticle = prixArticle;
    this.prixSolde = prixSolde;
    this.quantiteStock = quantiteStock;
    this.categories = categories;
    this.images = images;
  }
}
