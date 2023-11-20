import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from 'src/app/models/Article.model';
import { Category } from 'src/app/models/Category.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-deletecategorymodal',
  templateUrl: './deletecategorymodal.component.html',
  styleUrls: ['./deletecategorymodal.component.css'],
})
export class DeletecategorymodalComponent {
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<DeletecategorymodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private articleService: ArticleService
  ) {
    this.category = { ...data };
  }

  onDelete(): void {
    // Check if the category has associated articles
    this.articleService
      .getArticlesByCodeCategory(this.category.codeCategory)
      .subscribe(
        (articles: Article[]) => {
          if (articles && articles.length > 0) {
            this.snackBar.open(
              'Vous ne pouvez pas supprimer une catégorie associée à des articles',
              'Fermer',
              {
                duration: 3000,
              }
            );
          } else {
            // Delete the category if no associated articles
            this.categoryService
              .deleteCategorie(this.category.codeCategory)
              .subscribe(
                () => {
                  this.snackBar.open(
                    'Catégorie supprimée avec succés.',
                    'Fermer',
                    {
                      duration: 3000,
                    }
                  );
                  this.dialogRef.close(true);
                },
                (error) => {
                  console.error('Error deleting category:', error);
                }
              );
          }
        },
        (error) => {
          console.error('Error fetching articles:', error);
        }
      );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
