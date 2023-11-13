import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Article } from 'src/app/models/Article.model';
import { Category } from 'src/app/models/Category.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  keywordFilter: string = '';
  selectedCategory: string = '';
  categories: Category[] = [];

  displayedColumns: string[] = [
    'articlename',
    'categoriename',
    'prix',
    'prixsolde',
    'quantité',
    'bareCode',
    'actions',
  ];

  // Add the totalItems property
  totalItems: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
    this.loadCategories();
  }

  loadArticles() {
    // Call your article service to retrieve articles
    this.articleService.getAllArticles().subscribe((data) => {
      this.articles = data;
      console.log('Total Articles:', this.articles.length);

      // Update totalItems for pagination
      // Update length property directly on the paginator
      this.paginator.length = this.articles.length;
      console.log('Total Items for Pagination:', this.totalItems);
      // Refresh the paginator
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      // After getting the articles, set up the paginator
      this.setupPaginator();
    });
  }
  setupPaginator(): void {
    this.paginator.length = this.articles.length;
    this.paginator.pageSize = this.itemsPerPage;
    this.paginator.pageIndex = this.currentPage - 1;
  }
  getCategoriesNames(article: Article): string {
    // Extract category names from the article's categories array
    const categoryNames = article.categories.map(
      (category) => category.nomCategory
    );
    return categoryNames.join(',');
  }

  // articles.component.ts
  getPagesArray(): number[] {
    const totalItems = this.articles.length; // Update this based on your service response
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
  }
}
