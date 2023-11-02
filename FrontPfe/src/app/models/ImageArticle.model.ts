import { Article } from './Article.model';

export class ImageArticle {
  idImage: number;
  url_image: string;
  article: Article;

  constructor(idImage: number, url_image: string, article: Article) {
    this.idImage = idImage;
    this.url_image = url_image;
    this.article = article;
  }
}
