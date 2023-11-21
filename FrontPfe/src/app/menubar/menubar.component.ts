import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category-service.service';
import { Category } from '../models/Category.model';
import { MatSidenav } from '@angular/material/sidenav';
screen;
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  categories: Category[] = [];

  currentCategory: string | number | null = null;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  selectedChildCategory: Category | null = null;
  isUserConnected: boolean = !!localStorage.getItem('user');
  cartItemCount!: number;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    public userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.updateCartItemCount();
  }

  ngOnDestroy(): void {}

  hasChildren(category: Category): boolean {
    return this.categories.some(
      (c) => c.parentCategory?.codeCategory === category.codeCategory
    );
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  isMenuOpen(categoryName: string): boolean {
    return this.currentCategory === categoryName;
  }

  getChildrenForCategory(parentCode: number): Category[] {
    return this.categories.filter(
      (category) => category.parentCategory?.codeCategory === parentCode
    );
  }

  toggleMenu(categoryCode: number | string) {
    this.currentCategory =
      this.currentCategory === categoryCode ? null : categoryCode;
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
    this.router.navigate(['/category/', category.codeCategory]);
  }
  updateCartItemCount() {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
  }

  shouldDisplayMenubar(): boolean {
    const user = this.userService.getUserFromLocalStorage(); // Implement a method to get the current user from your user service
    return !user || (user.roleUser && user.roleUser.roleName === 'Client');
  }

  hasAnyChildren(category: Category): boolean {
    return category.articles && category.articles.length > 0;
  }
}
