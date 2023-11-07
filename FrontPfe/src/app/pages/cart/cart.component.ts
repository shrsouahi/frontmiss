import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { User } from 'src/app/models/User.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0.0;
  deliveryChoice: string = 'domicile';
  deliveryCost: number = 7;
  isCartEmpty: boolean = true;
  userId: number | null = null;
  user: User | null = null; // Declare the user property

  constructor(private cartService: CartService) {}
  ngOnInit() {
    // Retrieve the user data from local storage
    const storedUserJSON = localStorage.getItem('user');
    this.user = storedUserJSON ? JSON.parse(storedUserJSON) : null;
    this.userId = this.user?.idUser || null; // Use optional chaining (?.) to handle null

    // Fetch cart items and handle errors
    this.cartService.getCartItems(this.userId).subscribe(
      (articles) => {
        // Process your data here
        this.syncLocalStorageWithCart(articles);
      },
      (error) => {
        console.error('Error fetching cart items:', error);
        // You can handle the error here, e.g., show a message to the user.
      }
    );
  }

  // Separate method to synchronize local storage with cart items
  syncLocalStorageWithCart(articles: CartItem[]) {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      // Ensure that local storage items are synced with service items
      this.cartItems = this.cartItems.filter((item) =>
        articles.some((article) => article.idArticle === item.idArticle)
      );
    } else {
      this.cartItems = articles.map((cartItem) => ({
        idArticle: cartItem.idArticle,
        name: cartItem.name,
        selectedSize: cartItem.selectedSize,
        price: cartItem.price,
        quantity: 1,
        originalPrice: cartItem.originalPrice,
        userId: this.userId, // Set userId based on the current user
      }));
    }

    if (this.cartItems.length > 0) {
      this.isCartEmpty = false;
    }
    this.calculateTotal();
  }

  get calculatedTotal(): number {
    return this.calculateTotalForAllItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    //this.cartCleared = true; // Set the flag when the cart is cleared
    //localStorage.setItem('cartCleared', 'true');
  }
  removeItemFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
    this.cartService.getCartItems(this.userId).subscribe((items) => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity >= 0) {
      item.quantity = newQuantity;
      // Calculate and update the price based on originalPrice and new quantity
      item.price = item.originalPrice * newQuantity;
      this.cartService.updateCartItem(item); // Update the item in the service
      this.calculateTotal();
      //console.log('Updated cartItem:', item); // Log the updated cartItem
      //console.log('Updated cartItems:', this.cartItems); // Log the updated cartItems array
    }
  }

  calculateTotal() {
    this.total = this.cartService.calculateTotal();
  }

  updateTotal(item: CartItem) {
    // Update the total whenever the quantity changes for a specific item
    this.calculateTotal();
  }
  private calculateTotalForAllItems(): number {
    return this.cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.originalPrice,
      0
    );
  }

  calculateDeliveryAndTotal() {
    if (this.deliveryChoice === 'domicile') {
      this.deliveryCost = 7.0;
    } else if (this.deliveryChoice === 'free') {
      this.deliveryCost = 0.0;
    }
    this.calculateTotal();
  }
}
