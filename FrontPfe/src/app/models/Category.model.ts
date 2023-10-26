import { Article } from './Article.model';

export class Category {
  codeCategory: number;
  nomCategory: string;
  description: string;
  parentCategory: Category | null; // Adjust the type as needed
  articles: Article[]; // Assuming you have an Article model

  constructor(
    codeCategory: number,
    nomCategory: string,
    description: string,
    parentCategory: Category | null,
    articles: Article[]
  ) {
    this.codeCategory = codeCategory;
    this.nomCategory = nomCategory;
    this.description = description;
    this.parentCategory = parentCategory;
    this.articles = articles;
  }
}
