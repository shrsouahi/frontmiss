import { Article } from './Article.model';

export class ImageArticle {
  id?: number;
  url_image: string;
  article: Article;

  constructor(id: number, url_image: string, article: Article) {
    this.id = id;
    this.url_image = url_image;
    this.article = article;
  }
}
