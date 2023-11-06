// cart.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private userId: number | null;

  constructor() {
    // Load cart items from local storage when the service is initialized
    this.loadCart();
    this.userId = null; // Initialize userId with null
    this.loadUserId(); // Initialize userId from local storage
  }

  addToCart(cartItem: CartItem) {
    //if (this.userId) {
    //cartItem.userId = this.userId;
    // }
    cartItem.price = cartItem.originalPrice * cartItem.quantity; // Calculate the original price
    this.cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeFromCart(cartItem: CartItem) {
    const index = this.cartItems.findIndex(
      (item) => item.idArticle === cartItem.idArticle
    );
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    }
  }

  getCartItems(userId: number | null): Observable<CartItem[]> {
    const cartItems = this.loadCartItemsFromLocalStorage();

    // Filter the cart items based on the userId property and return as an Observable
    const filteredCartItems = cartItems.filter(
      (cartItem) => cartItem.userId === userId || cartItem.userId === null
    );
    console.log('id:', userId);

    return of(filteredCartItems);
  }

  private loadCartItemsFromLocalStorage(): CartItem[] {
    // Load cart items from local storage and parse them
    const storedCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );

    return storedCartItems;
  }

  //getCartItems(userId: number | null): Observable<CartItem[]> {
  //return of(this.cartItems);
  //}

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
  }
  calculateTotalForItem(cartItem: CartItem): number {
    return cartItem.price * cartItem.quantity;
  }

  private saveCart() {
    // Save the updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }
  updateCartItem(cartItem: CartItem) {
    const index = this.cartItems.findIndex(
      (item) => item.idArticle === cartItem.idArticle
    );
    if (index !== -1) {
      this.cartItems[index] = cartItem;
      this.saveCart();
    }
  }

  findCartItem(cartItem: CartItem): CartItem | undefined {
    return this.cartItems.find(
      (item) =>
        item.idArticle === cartItem.idArticle &&
        item.selectedSize === cartItem.selectedSize
    );
  }

  loadUserId(): number | null {
    const userId = localStorage.getItem('userId');
    this.userId = userId ? +userId : null;
    return this.userId;
  }
}
