import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { QuantitySize } from 'src/app/models/QuantitySize.model';
import { QuantitySizeService } from 'src/app/services/quantity-size.service';
import { Article } from 'src/app/models/Article.model';
import { ArticleService } from 'src/app/services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Size } from 'src/app/models/Size.model';
import { SizeService } from 'src/app/services/size.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-quantities',
  templateUrl: './edit-quantities.component.html',
  styleUrls: ['./edit-quantities.component.css'],
})
export class EditQuantitiesComponent implements OnInit {
  articleForm: FormGroup;
  quantitySizeData: QuantitySize[] = [];
  article: Article | undefined;
  sizes: Size[] = [];
  selectedSize: string = '';
  loading: boolean = false;

  // Define the displayed columns for the mat-table
  quantitySizeDisplayedColumns: string[] = [
    'number',
    'labelTaille',
    'quantityTaille',
  ];

  // Create a MatTableDataSource with your data
  quantitySizeDataSource = new MatTableDataSource<QuantitySize>(
    this.quantitySizeData
  );
  constructor(
    private route: ActivatedRoute,
    private quantitySizeService: QuantitySizeService,
    private router: Router,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private sizeService: SizeService,
    private snackBar: MatSnackBar
  ) {
    this.articleForm = this.fb.group({
      bareCode: [{ value: '', disabled: true }],
      nomArticle: [{ value: '', disabled: true }],
      quantiteStock: [{ value: '', disabled: true }],
      newQuantity: [''],
      selectedSize: [{ value: '' }],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const articleId = params['idArticle'];

      if (articleId) {
        this.loadArticleDetails(+articleId);
      } else {
        console.error('Invalid article ID.');
      }
    });
    this.loadSizes();
  }

  loadSizes() {
    this.sizeService.getAllSizes().subscribe(
      (sizes) => {
        this.sizes = sizes;
      },
      (error) => {
        console.error('Error fetching sizes:', error);
      }
    );
  }

  loadArticleDetails(idArticle: number) {
    this.articleService.getArticleById(idArticle).subscribe(
      (article) => {
        this.article = article;

        // Update form controls with article information
        this.articleForm.patchValue({
          bareCode: this.article.bareCode,
          nomArticle: this.article.nomArticle,
          quantiteStock: this.article.quantiteStock,
        });

        this.fetchAvailableSizes(+idArticle);
        console.log('Fetched article:', article);
      },
      (error) => {
        console.error('Error fetching article details:', error);
      }
    );
  }

  fetchAvailableSizes(idArticle: number) {
    this.quantitySizeService.getAvailableSizesForArticle(idArticle).subscribe(
      (quantitySizes) => {
        console.log('Fetched quantity sizes:', quantitySizes);
        this.quantitySizeData = quantitySizes;
        this.quantitySizeDataSource.data = this.quantitySizeData; // Update MatTableDataSource data
        this.updateGlobalQuantity();
      },
      (error) => {
        console.error('Error fetching available sizes:', error);
      }
    );
  }

  saveQuantitySize() {
    // Retrieve values from the form controls
    const idArticle = this.article!.idArticle;
    const labelSize = this.articleForm.get('selectedSize')?.value || '';
    const quantity = this.articleForm.get('newQuantity')?.value || 0;

    // Call the service method to create a new quantity size
    this.quantitySizeService
      .createQuantitySize({ idArticle, labelSize, quantity })
      .subscribe(
        (createdQuantitySize) => {
          // Handle success
          console.log('Created quantity size:', createdQuantitySize);
          this.loading = false; // Hide loading indicator
          this.articleForm.patchValue({
            newQuantity: '', // Set newQuantity to  an empty string
            selectedSize: '', // Set selectedSize to an empty string
          });
          this.snackBar.open('Quantité créée avec succès', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar'],
          });
          // refresh the data in table after creating a new quantity size
          this.fetchAvailableSizes(idArticle);
        },
        (error) => {
          // Handle error
          console.error('Error creating quantity size:', error);
          this.loading = false;
          if (error.status === 409) {
            // Display a message to the user for conflict (409) status
            this.snackBar.open(
              'Une quantité existe déja pour cette taille ,Vous pouvez la modifier',
              'Close',
              {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['error-snackbar'],
              }
            );
          }
        }
      );
  }
  // Function to update an existing quantity size
  updateQuantitySize(idArticle: number, labelSize: string, quantity: number) {
    // Call the service method to update the quantity size
    this.quantitySizeService
      .updateQuantitySize({ idArticle, labelSize, quantity })
      .subscribe(
        (updatedQuantitySize) => {
          //Handle sucess
          this.loading = false; // Hide loading indicator
          this.articleForm.patchValue({
            newQuantity: '', // Set newQuantity to ''
            selectedSize: '', // Set selectedSize to an empty string
          });
          this.snackBar.open('Quantité mise à jour avec succès', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar'],
          });

          console.log('Updated quantity size:', updatedQuantitySize);

          // Refresh the data in the table after updating the quantity size
          this.fetchAvailableSizes(idArticle);
          this.updateGlobalQuantity();
        },
        (error) => {
          console.error('Error updating quantity size:', error);
          this.loading = false; // Hide loading indicator
        }
      );
  }
  changeQuantitySize() {
    // Retrieve values from the form controls
    const idArticle = this.article!.idArticle;
    const labelSize = this.articleForm.get('selectedSize')?.value || '';
    const quantity = this.articleForm.get('newQuantity')?.value || 0;

    // Call the method to update the quantity size
    this.updateQuantitySize(idArticle, labelSize, quantity);
  }
  calculateTotalQuantity(): number {
    // Sum up the quantities for each size
    const totalQuantity = this.quantitySizeData.reduce((sum, quantitySize) => {
      return sum + quantitySize.quantityStockArticle;
    }, 0);

    return totalQuantity;
  }
  updateGlobalQuantity() {
    const totalQuantity = this.calculateTotalQuantity();

    // Update the form control for the global quantity
    this.articleForm.patchValue({
      quantiteStock: totalQuantity,
    });

    // Optionally, you can also update the article object if needed
    if (this.article) {
      this.article.quantiteStock = totalQuantity;

      // Call the service method to update the article on the server
      this.articleService
        .updateGlobalQuantityInArticle(this.article.idArticle, totalQuantity)
        .subscribe(
          (updatedArticle) => {
            console.log('Article updated on the server:', updatedArticle);

            // Optionally, you can perform additional actions after the server update
            // this.snackBar.open(
            // 'La Quantité de Stock est mise à jour avec succès',
            // 'Fermer',
            //  {
            ////  duration: 3000,
            //  verticalPosition: 'top',
            //  horizontalPosition: 'center',
            // panelClass: ['success-snackbar'],
            //  }
            // );
          },
          (error) => {
            console.error('Error updating article on the server:', error);

            // Optionally, you can handle errors and display messages
            this.snackBar.open(
              'Erreur lors de la mise à jour de la quantité globale',
              'Fermer',
              {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['error-snackbar'],
              }
            );
          }
        );
    }
  }
}
