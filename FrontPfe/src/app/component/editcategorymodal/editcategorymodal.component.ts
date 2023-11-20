import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category.model';

@Component({
  selector: 'app-editcategorymodal',
  templateUrl: './editcategorymodal.component.html',
  styleUrls: ['./editcategorymodal.component.css'],
})
export class EditcategorymodalComponent {
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<EditcategorymodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    // Assign the data passed to the modal to the component property
    this.category = { ...data };
  }

  onSave(): void {
    // Implement logic to save the edited category
    this.dialogRef.close(this.category);
  }

  onCancel(): void {
    // Close the modal without saving changes
    this.dialogRef.close();
  }
}
