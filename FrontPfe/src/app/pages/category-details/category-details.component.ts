import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/Category.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  category: Category | undefined;
  categoryId: number | null = null; // Initialize as null
  articles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private articleService: ArticleService
  ) {
    this.route.paramMap.subscribe((params) => {
      const categoryIdParam = params.get('id');
      if (categoryIdParam) {
        this.categoryId = +categoryIdParam;
        this.loadCategoryAndArticles(this.categoryId);
      } else {
        // Handle the case when 'categoryId' is null, e.g., show an error or redirect.
      }
    });
  }

  ngOnInit(): void {}

  loadCategoryAndArticles(categoryId: number) {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.category = categories.find((cat) => cat.codeCategory === categoryId);
    });
    console.log('Category ID:', categoryId);
    // Now, you can use categoryId to load articles using ArticleService
    this.articleService.getArticlesByCodeCategory(categoryId).subscribe(
      (data: any) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
}
