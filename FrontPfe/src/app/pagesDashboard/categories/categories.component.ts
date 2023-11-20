import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['nomCategory', 'description', 'parentCategory'];
  categories: Category[] = [];
  totalItems: number = 0;
  selectedPageSize: number = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Category>(this.categories);

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  onPageChange(event: PageEvent): void {
    this.selectedPageSize = event.pageSize;
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;

        // Update the data source
        this.dataSource.data = this.categories;

        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
