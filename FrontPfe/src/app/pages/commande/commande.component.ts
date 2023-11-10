import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent implements OnInit {
  orderForm: FormGroup;
  user: any; // User information retrieved from local storage
  cartItems!: CartItem[];
  total!: number;
  deliveryCost!: number;
  deliveryChoice: any;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.orderForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      lastname: [{ value: '', disabled: true }, [Validators.required]],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      phoneNumber: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      region: ['', [Validators.required]],
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['cartItems']) {
        this.cartItems = JSON.parse(params['cartItems']);
      } else {
        this.cartItems = [];
      }

      if (params['total']) {
        this.total = parseFloat(params['total']);
      }

      if (params['deliveryCost']) {
        this.deliveryCost = parseFloat(params['deliveryCost']);
      }
    });
  }

  ngOnInit(): void {
    this.retrieveUserDataFromLocalStorage();
  }

  retrieveUserDataFromLocalStorage() {
    console.log('Retrieving user data from local storage');
    // Retrieve user data from local storage (replace 'userData' with your key)
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      // Set the user data in the form
      this.orderForm.patchValue({
        name: this.user.fName,
        lastname: this.user.lName,
        email: this.user.email,
        phoneNumber: this.user.phone,
        adresse: this.user.adresse,
        ville: this.user.ville,
        region: this.user.region,
      });
    }
  }

  onSaveClick(): void {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      // Handle the order creation logic here, and the user's input for address
      // Clear the cart (if needed)
      // Show a success message or navigate to a thank you page
      // Close the dialog or navigate to another page

      // Clear the cart
      this.cartService.clearCart();

      // Handle the rest of the order creation logic...
    }
  }
}
