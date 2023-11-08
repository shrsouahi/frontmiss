// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject(
    0
  );
  cartItemCount$: Observable<number> = this.cartItemCountSubject.asObservable();
  private cartItems: CartItem[] = [];
  private userId: number | null;

  constructor() {
    // Load cart items from local storage when the service is initialized
    this.loadCart();
    this.userId = null; // Initialize userId with null
    this.loadUserId(); // Initialize userId from local storage
  }

  addToCart(cartItem: CartItem) {
    cartItem.price = cartItem.originalPrice * cartItem.quantity; // Calculate the original price
    this.cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.saveCart();

    this.cartItemCountSubject.next(this.cartItems.length); // Update the cart item count
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
    // Load all cart items from local storage
    const cartItems = this.loadCartItemsFromLocalStorage();

    if (userId === null) {
      // If no user is logged in (visitor), return all cart items as is
      return of(cartItems);
    } else {
      // User is logged in, retrieve and merge with the visitor's cart
      const visitorCartItems = cartItems.filter(
        (cartItem) => cartItem.userId === -1
      );
      const userCartItems = cartItems.filter(
        (cartItem) => cartItem.userId === userId
      );

      // Merge the visitor's cart items with the user's cart items
      const mergedCartItems = this.mergeCarts(visitorCartItems, userCartItems);

      // Return the merged cart items as an Observable
      return of(mergedCartItems);
    }
  }
  mergeCarts(
    visitorCartItems: CartItem[],
    userCartItems: CartItem[]
  ): CartItem[] {
    // Merge the visitor's cart items with the user's cart items
    const mergedCartItems = [...userCartItems];

    for (const visitorCartItem of visitorCartItems) {
      const existingItem = mergedCartItems.find(
        (userCartItem) => userCartItem.idArticle === visitorCartItem.idArticle
      );

      if (existingItem) {
        // If the item already exists in the user's cart, update its quantity
        existingItem.quantity += visitorCartItem.quantity;
      } else {
        // If the item doesn't exist in the user's cart, add it
        mergedCartItems.push(visitorCartItem);
      }
    }

    return mergedCartItems;
  }

  private loadCartItemsFromLocalStorage(): CartItem[] {
    // Load cart items from local storage and parse them
    const storedCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    ) as CartItem[];

    return storedCartItems;
  }

  clearCart() {
    //to clear the user's cart when logging out
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

  getCartItemCount(): number {
    return this.cartItems.length;
  }
}
