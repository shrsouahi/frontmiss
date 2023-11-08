import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      region: ['', Validators.required],
    });
  }

  onCancelClick() {
    // Implement your cancel logic here
  }

  onSaveClick() {
    // Implement your save logic here
  }
}
