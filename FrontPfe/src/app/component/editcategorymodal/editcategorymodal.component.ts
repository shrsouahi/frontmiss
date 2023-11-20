import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-editcategorymodal',
  templateUrl: './editcategorymodal.component.html',
  styleUrls: ['./editcategorymodal.component.css'],
})
export class EditcategorymodalComponent {
  category: Category;
  editCategoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditcategorymodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.category = data;
    this.editCategoryForm = this.fb.group({
      nomCategory: [this.category.nomCategory, Validators.required],
      description: [this.category.description],
    });
  }

  onSave(): void {
    const updatedCategory: Category = {
      codeCategory: this.category.codeCategory,
      nomCategory: this.editCategoryForm.value.nomCategory,
      description: this.editCategoryForm.value.description,
      parentCategory: this.category.parentCategory,
      articles: this.category.articles,
    };
    this.categoryService
      .updateCategory(this.category.codeCategory, updatedCategory)
      .subscribe(
        (result) => {
          this.dialogRef.close(updatedCategory);
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
  }

  onCancel(): void {
    // Close the modal without saving changes
    this.dialogRef.close();
  }
}
