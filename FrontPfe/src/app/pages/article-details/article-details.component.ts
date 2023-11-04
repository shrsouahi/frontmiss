import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article.model';
import { ArticleService } from 'src/app/services/article.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SizeService } from 'src/app/services/size.service';
import { Size } from 'src/app/models/Size.model';
import { QuantitySizeService } from 'src/app/services/quantity-size.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | undefined;
  sizes: Size[] = [];
  selectedSize: string;
  currentBigImage: string = '';
  // Declare a boolean variable to track the availability of the selected size
  sizeAvailable: boolean = true;
  // Declare a variable for available sizes
  availableSizes: string[] = [];
  addToCartMessage: string = '';
  isAddingToCart: boolean = false;
  articleQuantityStock: number = 0; //default value for quantityStock total
  articleAvailableInStock: boolean = true; // Initialize as true by default

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
    private sizeService: SizeService,
    private quantitySizeService: QuantitySizeService
  ) {
    this.selectedSize = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idarticle = params.get('idarticle');
      console.log('Article ID:', idarticle);
      if (idarticle !== null) {
        this.loadArticleDetails(+idarticle);

        this.fetchAvailableSizes(+idarticle);
      }
      this.fetchSizes();
    });
  }

  changeBigImage(newImageUrl: string) {
    this.currentBigImage = newImageUrl;
  }

  loadArticleDetails(idarticle: number) {
    this.articleService.getArticleById(idarticle).subscribe(
      (article) => {
        this.article = article;
        // Set the article's quantity stock
        this.articleQuantityStock = article.quantiteStock;

        if (this.article && this.article.images) {
          this.article.images.forEach((image) => {
            if (image.url_image) {
              image.url_image = image.url_image.replace(/\\/g, '/');
            }
          });

          if (this.article.images.length > 0) {
            this.currentBigImage = this.article.images[0].url_image; // Initialize with the first image URL
          }
        }
        console.log('Fetched article:', article);
      },
      (error) => {
        console.error('Error fetching article details:', error);
      }
    );
  }

  sanitizeImageUrl(url: string) {
    // Sanitize the URL using DomSanitizer
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  fetchSizes() {
    // Fetch sizes data from ervice and assign it to the sizes array.
    this.sizeService.getAllSizes().subscribe(
      (sizes) => {
        this.sizes = sizes;
      },
      (error) => {
        console.error('Error fetching sizes:', error);
      }
    );
  }

  fetchAvailableSizes(articleId: number) {
    this.quantitySizeService.getAvailableSizesForArticle(articleId).subscribe(
      (quantitySizes) => {
        // Filter out sizes with quantity = 0
        this.availableSizes = quantitySizes
          .filter((size) => size.quantityStockArticle > 0)
          .map((size) => size.size.labelSize);

        this.checkSizeAvailability(); // Check size availability
      },
      (error) => {
        console.error('Error fetching available sizes:', error);
      }
    );
  }

  checkSizeAvailability() {
    if (this.selectedSize) {
      this.sizeAvailable = this.availableSizes.includes(this.selectedSize);
    }
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.checkSizeAvailability(); // Check size availability when the size is selected
  }

  onSizeChange() {
    if (this.selectedSize) {
      // Check if the selected size is available
      const selectedSizeAvailable = this.availableSizes.includes(
        this.selectedSize
      );
      this.sizeAvailable = selectedSizeAvailable;
    }
  }

  addToCart() {
    if (this.sizeAvailable) {
      this.isAddingToCart = true;
      // Implement your add to cart logic here

      setTimeout(() => {
        this.addToCartMessage = 'Article ajouté au panier.';
        this.isAddingToCart = false;
        console.log('Added to cart:', this.article);
      }, 2000); // Assuming a 2-second loading simulation
    } else {
      this.addToCartMessage = "La taille sélectionnée n'est pas disponible.";
    }
  }

  clearAddToCartMessage() {
    this.addToCartMessage = '';
  }
}
