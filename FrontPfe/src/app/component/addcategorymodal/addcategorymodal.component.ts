import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-addcategorymodal',
  templateUrl: './addcategorymodal.component.html',
  styleUrls: ['./addcategorymodal.component.css'],
})
export class AddcategorymodalComponent {
  addCategoryForm: FormGroup;
  availableCategories: Category[] = []; // Assuming you have a property to store available categories

  constructor(
    public dialogRef: MatDialogRef<AddcategorymodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.addCategoryForm = this.fb.group({
      nomCategory: ['', Validators.required],
      description: [''],
      parentCategoryCheckbox: [false],
      parentCategory: [null],
    });

    // Fetch available categories
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.availableCategories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSave(): void {
    const newCategory: Category = {
      nomCategory: this.addCategoryForm.value.nomCategory,
      description: this.addCategoryForm.value.description,
      parentCategory: this.addCategoryForm.value.parentCategory,
      codeCategory: 0,
      articles: [],
    };

    this.categoryService.addCategory(newCategory).subscribe(
      (addedCategory) => {
        // Category added successfully, close the modal
        this.dialogRef.close(addedCategory);
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onParentCategoryChange(): void {
    const checkboxValue = this.addCategoryForm.value.parentCategoryCheckbox;
    console.log(
      'Checkbox value:',
      this.addCategoryForm.get('parentCategoryCheckbox')?.value
    );

    if (!checkboxValue) {
      this.addCategoryForm.patchValue({ parentCategory: null });
    }
  }
}
