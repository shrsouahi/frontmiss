import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category-service.service';
import { Category } from '../models/Category.model';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
screen;

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  categories: Category[] = [];
  currentCategory: string | null = null;
  selectedChildCategory: Category | null = null; // New property to track selected child category
  router: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  toggleMenu(category: string) {
    this.currentCategory = this.currentCategory === category ? null : category;
  }

  isMenuOpen(categoryName: string): boolean {
    return this.currentCategory === categoryName;
  }

  selectChildCategory(childCategory: Category) {
    // Handle the selection of child category
    this.selectedChildCategory = childCategory;
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  selectCategory(category: Category) {
    // Navigate to the details page with the category code
    this.router.navigate(['/category', category.codeCategory]);
  }
}
