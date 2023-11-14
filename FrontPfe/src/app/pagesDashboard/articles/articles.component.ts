import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Article } from 'src/app/models/Article.model';
import { Category } from 'src/app/models/Category.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Router } from '@angular/router';
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
  selectedPageSize: number = 7;

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

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Article>(this.articles);
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.articles);
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArticles();
    this.loadCategories();
  }

  loadArticles() {
    // Call your article service to retrieve articles
    this.articleService.getAllArticles().subscribe((data) => {
      this.articles = data;

      // Apply filters
      let filteredArticles = this.filterArticles(data);

      this.articles = filteredArticles;
      // Update the data source
      this.dataSource.data = this.articles;

      // Update totalItems for pagination
      this.totalItems = this.articles.length;

      // Update length property directly on the paginator
      this.paginator.length = this.totalItems;

      // Refresh the paginator
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  filterArticles(articles: Article[]): Article[] {
    // Apply filters based on keyword and selected category
    return articles.filter((article) => {
      const matchesKeyword = article.nomArticle
        .toLowerCase()
        .includes(this.keywordFilter.toLowerCase());

      const matchesCategory =
        this.selectedCategory === '' ||
        article.categories.some((category) =>
          category.nomCategory
            .toLowerCase()
            .includes(this.selectedCategory.toLowerCase())
        );

      return matchesKeyword && matchesCategory;
    });
  }

  getCategoriesNames(article: Article): string {
    // Extract category names from the article's categories array
    const categoryNames = article.categories.map(
      (category) => category.nomCategory
    );
    return categoryNames.join(',');
  }
  onPageChange(event: PageEvent): void {
    this.selectedPageSize = event.pageSize;
  }
  resetFilters() {
    this.keywordFilter = '';
    this.selectedCategory = '';
    this.loadArticles();
  }

  openDeleteConfirmationDialog(idArticle: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call the deleteArticleById method when confirmed
        this.articleService.deleteArticleById(idArticle).subscribe(
          () => {
            // Reload the articles or update the data source as needed
            this.loadArticles();
          },
          (error) => {
            console.error('Error deleting article:', error);
          }
        );
      }
    });
  }
  navigateToAddArticlePage() {
    this.router.navigate(['/add-article']);
  }
}
