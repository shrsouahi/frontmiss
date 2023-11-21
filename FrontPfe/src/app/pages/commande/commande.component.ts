import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CommandeService } from 'src/app/services/commande.service';
import { User } from 'src/app/models/User.model';
import { Commande } from 'src/app/models/Commande.model'; // Import Commande and OrderStatus
import { QuantityOrder } from 'src/app/models/QuantityOrder.model'; // Import QuantityOrder
import { OrderStatus } from 'src/app/models/OrderStatus.model';
import { CommandeDTO } from 'src/app/models/CommandeDTO.model';
import { QuantitySizeService } from 'src/app/services/quantity-size.service';

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
  deliveryChoice!: string;
  userFromLocalStorage: User | null = null;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private route: ActivatedRoute,
    private userService: UserService,
    private commandeService: CommandeService,
    private router: Router,
    private quantitySizeService: QuantitySizeService
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

      if (params['deliveryChoice']) {
        this.deliveryChoice = params['deliveryChoice'];
      }
    });
  }

  ngOnInit(): void {
    this.userFromLocalStorage =
      this.userService.getUserFromLocalStorage() || null;
    this.retrieveUserDataFromLocalStorage();
  }

  retrieveUserDataFromLocalStorage() {
    console.log('Retrieving user data from local storage');
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
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

  onCancelClick() {
    this.router.navigate(['/panier']);
  }

  onSaveClick(): void {
    if (this.userFromLocalStorage) {
      const updatedUser: User = {
        idUser: this.userFromLocalStorage.idUser,
        fName: this.orderForm.get('name')?.value,
        lName: this.orderForm.get('lastname')?.value,
        email: this.orderForm.get('email')?.value,
        phone: this.orderForm.get('phoneNumber')?.value,
        adresse: this.orderForm.get('adresse')?.value,
        ville: this.orderForm.get('ville')?.value,
        region: this.orderForm.get('region')?.value,
        password: this.userFromLocalStorage?.password,
        roleUser: this.userFromLocalStorage.roleUser,
      };

      console.log('User before saving Commande:', this.userFromLocalStorage);

      // Create an instance of the CommandeDTO class
      const commandeDTO = new CommandeDTO(
        '', // The reference might be generated on the server
        this.total + this.deliveryCost,
        new Date().toISOString(), // Format on the server if needed
        this.deliveryChoice,
        'Créée',
        this.userFromLocalStorage
      );

      // Map cartItems to the desired format
      const formattedCartItems = this.cartItems.map((cartItem) => ({
        idArticle: cartItem.idArticle,
        selectedSize: cartItem.selectedSize,
        quantity: cartItem.quantity,
        price: cartItem.price,
        name: cartItem.name,
        originalPrice: cartItem.originalPrice,
        userId: cartItem.userId,
        image: cartItem.image,
      }));

      // Prepare the orderData
      const orderData = {
        commande: commandeDTO,
        cartItems: formattedCartItems,
        user: this.userFromLocalStorage,
      };

      // Call the service to save the orderData
      this.userService
        .updateUserProfile(updatedUser, updatedUser.idUser)
        .subscribe(
          (updatedUserData) => {
            console.log('User updated successfully:', updatedUserData);

            this.commandeService.saveCommande(orderData).subscribe(
              (response) => {
                console.log('Order saved successfully:', response);

                // Store idCommande in localStorage
                localStorage.setItem('idCommande', response.idCommande);

                // Update quantity sizes for each cart item
                this.updateQuantitySizes();

                this.cartService.clearCart();
                // Navigate to the "ordersucess" page
                this.router.navigate(['/ordersucess']);
              },
              (error) => {
                console.error('Error saving order:', error);
              }
            );
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
    }
  }
  private updateQuantitySizes(): void {
    // Call the updateQuantitySize method for each cart item
    this.cartItems.forEach((cartItem) => {
      // Retrieve the available sizes for the article
      this.quantitySizeService
        .getAvailableSizesForArticle(cartItem.idArticle)
        .subscribe(
          (availableSizes) => {
            // Find the quantity size that matches the selected size in the cart
            const selectedSize = availableSizes.find(
              (size) => size.size.labelSize === cartItem.selectedSize
            );

            // If the selected size is found, update its quantity
            if (selectedSize) {
              const remainingQuantity =
                selectedSize.quantityStockArticle - cartItem.quantity;

              // Ensure remainingQuantity is not negative
              const updatedQuantity =
                remainingQuantity >= 0 ? remainingQuantity : 0;

              // Update the quantity size with the calculated value
              this.quantitySizeService
                .updateQuantitySize({
                  idArticle: cartItem.idArticle,
                  labelSize: cartItem.selectedSize,
                  quantity: updatedQuantity,
                })
                .subscribe(
                  (response) => {
                    console.log('QuantitySize updated successfully:', response);
                  },
                  (error) => {
                    console.error('Error updating QuantitySize:', error);
                  }
                );
            } else {
              console.warn(
                `Selected size '${cartItem.selectedSize}' not found for article '${cartItem.idArticle}'.`
              );
            }
          },
          (error) => {
            console.error('Error retrieving available sizes:', error);
          }
        );
    });
  }
}
