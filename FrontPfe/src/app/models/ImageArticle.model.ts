import { Article } from './Article.model';

export class ImageArticle {
  idImage: number;
  urlImage: string;
  article: Article; // Assuming you have an Article model

  constructor(idImage: number, urlImage: string, article: Article) {
    this.idImage = idImage;
    this.urlImage = urlImage;
    this.article = article;
  }
}
