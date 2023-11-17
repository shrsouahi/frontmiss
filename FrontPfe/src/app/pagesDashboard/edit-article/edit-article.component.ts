import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from 'src/app/models/Article.model';
import { Category } from 'src/app/models/Category.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category-service.service';
import { ImageArticleService } from 'src/app/services/image-article-service.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  articleForm: FormGroup;
  categories: Category[] = [];
  article: Article = {
    idArticle: 0,
    bareCode: 0,
    nomArticle: '',
    descriptionArticle: '',
    prixArticle: 0,
    prixSolde: 0,
    quantiteStock: 0,
    categories: [],
    images: [],
  };

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private imageArticleService: ImageArticleService
  ) {
    this.articleForm = this.fb.group({
      bareCode: ['', Validators.required],
      nomArticle: ['', Validators.required],
      descriptionArticle: [''],
      prixArticle: ['', Validators.required],
      prixSolde: [''],
      categories: [[]],
      //images: [[]],
      imageUrl: [''],
    });
  }

  ngOnInit(): void {
    this.getCategories();

    this.route.params.subscribe((params) => {
      const idArticle = +params['idArticle'];

      this.articleService.getArticleById(idArticle).subscribe(
        (result) => {
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
      categories: this.article.categories,
      // images: this.article.images,
    });
  }

  updateArticle() {
    if (this.articleForm.valid) {
      const updatedArticle: Article = this.articleForm.value;

      // Check if this.article is defined before accessing quantiteStock
      updatedArticle.quantiteStock = this.article
        ? this.article.quantiteStock
        : 0;
      // After updating the article, add the image
      const idArticle = this.article.idArticle; // Get the article ID
      const imageUrl = this.articleForm.get('imageUrl')?.value;

      console.log('idArticle:', idArticle);
      console.log('imageUrl:', imageUrl);

      if (imageUrl) {
        // If imageUrl is not empty, call the addImageForArticle method
        this.imageArticleService
          .addImageForArticle(idArticle, imageUrl)
          .subscribe(
            (addedImage) => {
              console.log('Image added successfully:', addedImage);
            },
            (error) => {
              console.error('Error adding image:', error);
            }
          );
      }
      this.articleService
        .updateArticle(this.article.idArticle, updatedArticle)
        .subscribe(
          (updatedArticle) => {
            console.log('Article updated successfully:', updatedArticle);
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
  navigateArticles() {
    this.router.navigate(['/articles']);
  }
}
