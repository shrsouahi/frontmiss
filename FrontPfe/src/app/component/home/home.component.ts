import { Component, OnInit } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/Article.model';
import { Category } from 'src/app/models/Category.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category-service.service';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  animations: [
    trigger('slide', [
      transition(':increment', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  nouvelleCollectionCategoryId: number = 254;
  vetementsAutomneHiverCategoryId: number = 205;
  soldesCategoryId: number = 255;
  newCollectionArticles: any[] = [];
  vetementsAutomneHiverArticles: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private articleService: ArticleService
  ) {}
  ngOnInit(): void {
    // Fetch both categories and their articles
    this.fetchArticlesForCategory(
      this.nouvelleCollectionCategoryId,
      this.newCollectionArticles
    );
    this.fetchArticlesForCategory(
      this.vetementsAutomneHiverCategoryId,
      this.vetementsAutomneHiverArticles
    );
  }

  fetchArticlesForCategory(categoryId: number, articlesArray: any[]) {
    this.categoryService.getCategorieByid(categoryId).subscribe(
      (category: Category) => {
        // Check if category is available
        if (category) {
          // Fetch articles for the category
          this.articleService.getArticlesByCodeCategory(categoryId).subscribe(
            (articles: Article[]) => {
              // Update the first 3 elements of the array
              articlesArray.length = 0; // Clear existing elements
              Array.prototype.push.apply(articlesArray, articles.slice(0, 3)); // Add new elements
            },
            (articlesError) => {
              console.error(
                `Error fetching articles for category ${categoryId}:`,
                articlesError
              );
            }
          );
        } else {
          console.error(`Category not available: ${categoryId}`);
        }
      },
      (categoryError) => {
        console.error(`Error fetching category ${categoryId}:`, categoryError);
      }
    );
  }

  // Function to navigate to category details page
  viewCategoryDetails(categoryId: number) {
    this.router.navigate(['/category', categoryId]);
  }
}
