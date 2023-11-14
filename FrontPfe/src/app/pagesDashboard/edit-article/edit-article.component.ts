import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from 'src/app/models/Article.model';
import { Category } from 'src/app/models/Category.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  articleForm: FormGroup;
  categories: Category[] = [];
  article: Article = {
    idArticle: 0, // Assuming idArticle is a number, initialize it appropriately
    bareCode: 0,
    nomArticle: '',
    descriptionArticle: '',
    prixArticle: 0, // Assuming prixArticle is a number, initialize it appropriately
    prixSolde: 0, // Assuming prixSolde is a number, initialize it appropriately
    quantiteStock: 0, // Assuming quantiteStock is a number, initialize it appropriately
    categories: [],
    images: [],
  };

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.articleForm = this.fb.group({
      bareCode: ['', Validators.required],
      nomArticle: ['', Validators.required],
      descriptionArticle: [''],
      prixArticle: ['', Validators.required],
      prixSolde: [''],
      quantiteStock: ['', Validators.required],
      categories: [[]],
      images: [[]],
    });
  }

  ngOnInit(): void {
    this.getCategories();

    // Get the articleId from the route parameters
    this.route.params.subscribe((params) => {
      const idArticle = +params['idArticle']; // Assuming 'id' is the route parameter

      // Call the getArticleById method to fetch the article
      this.articleService.getArticleById(idArticle).subscribe(
        (result) => {
          // Handle the result, for example, patch the form with the fetched data
          this.article = result;
          this.patchFormWithArticleData();
        },
        (error) => {
          console.error('Error fetching article:', error);
        }
      );
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  patchFormWithArticleData() {
    // Patch the form with the fetched article data
    this.articleForm.patchValue({
      bareCode: this.article.bareCode,
      nomArticle: this.article.nomArticle,
      descriptionArticle: this.article.descriptionArticle,
      prixArticle: this.article.prixArticle,
      prixSolde: this.article.prixSolde,
      quantiteStock: this.article.quantiteStock,
      categories: this.article.categories,
      images: this.article.images,
    });
  }

  updateArticle() {
    if (this.articleForm.valid) {
      const updatedArticle: Article = this.articleForm.value;
      // Assuming you have an updateArticle method in your ArticleService
      this.articleService
        .updateArticle(this.article.idArticle, updatedArticle)
        .subscribe(
          (updatedArticle) => {
            console.log('Article updated successfully:', updatedArticle);
            // Display a success message using MatSnackBar
            this.snackBar.open('Article mis à jour avec succès', 'OK', {
              duration: 4000,
            });

            this.router.navigate(['/articles']);
          },
          (error) => {
            console.error('Error updating article:', error);
          }
        );
    }
  }
}
