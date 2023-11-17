import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/Article.model';
import { Category } from 'src/app/models/Category.model';
import { ImageArticle } from 'src/app/models/ImageArticle.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  articleForm: FormGroup;
  categories: Category[] = [];
  article: Article = {
    // Initialize Article object with default values
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
    });
  }

  ngOnInit(): void {
    this.getCategories();
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

  addArticle() {
    if (this.articleForm.valid) {
      const newArticle: Article = this.articleForm.value;

      this.articleService.addArticle(newArticle).subscribe(
        (addedArticle) => {
          console.log('Article added successfully:', addedArticle);
          // Display a success message using MatSnackBar
          this.snackBar.open('Article ajouté avec succès', 'OK', {
            duration: 4000,
          });

          this.router.navigate(['/articles']);
        },
        (error) => {
          console.error('Error adding article:', error);
        }
      );
    }
  }

  /*onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
    }
  }*/
}
