import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/Article.model';
import { Category } from 'src/app/models/Category.model';
import { ImageArticle } from 'src/app/models/ImageArticle.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileHandle } from 'src/app/models/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  articleForm: FormGroup;
  categories: Category[] = [];
  article: Article = {
    bareCode: 0,
    nomArticle: '',
    descriptionArticle: '',
    prixArticle: 0,
    prixSolde: 0,
    quantiteStock: 0,
    categories: [],
    images: [],
    idArticle: 0,
  };

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
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

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const FileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.article.images.push(FileHandle);
    }
  }
}
