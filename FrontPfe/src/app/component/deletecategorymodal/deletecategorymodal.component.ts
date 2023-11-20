import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category.model';

@Component({
  selector: 'app-deletecategorymodal',
  templateUrl: './deletecategorymodal.component.html',
  styleUrls: ['./deletecategorymodal.component.css'],
})
export class DeletecategorymodalComponent {
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<DeletecategorymodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.category = { ...data };
  }

  onDelete(): void {
    // Implement logic to delete the category
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Close the modal without deleting the category
    this.dialogRef.close();
  }
}
