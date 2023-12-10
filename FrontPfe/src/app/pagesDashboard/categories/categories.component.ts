import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddcategorymodalComponent } from 'src/app/component/addcategorymodal/addcategorymodal.component';
import { DeletecategorymodalComponent } from 'src/app/component/deletecategorymodal/deletecategorymodal.component';
import { EditcategorymodalComponent } from 'src/app/component/editcategorymodal/editcategorymodal.component';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    'nomCategory',
    'description',
    'parentCategory',
    'actions',
  ];
  categories: Category[] = [];
  totalItems: number = 0;
  selectedPageSize: number = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Category>(this.categories);

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  onPageChange(event: PageEvent): void {
    this.selectedPageSize = event.pageSize;
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.categories);
    this.dataSource.paginator = this.paginator;
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;

        this.dataSource.data = this.categories;

        this.totalItems = this.categories.length;

        this.paginator.length = this.totalItems;

        this.paginator._changePageSize(this.paginator.pageSize);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  openEditModal(category: Category): void {
    // Open the edit modal with data
    const dialogRef = this.dialog.open(EditcategorymodalComponent, {
      data: category,
      panelClass: 'custom-modal',
    });

    // Subscribe to the afterClosed event to get the result after modal is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result, e.g., reload categories
        this.loadCategories();
      }
    });
  }

  openDeleteModal(category: Category): void {
    // Open the delete modal with data
    const dialogRef = this.dialog.open(DeletecategorymodalComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategories();
        console.log('Delete Modal Result:', result);
      }
    });
  }
  openAddModal(): void {
    // Open the add modal
    const dialogRef = this.dialog.open(AddcategorymodalComponent, {
      panelClass: 'custom-modal',
    });
    // Subscribe to the afterClosed event to get the result after the modal is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result, e.g., reload categories
        this.loadCategories();
      }
    });
  }
}
