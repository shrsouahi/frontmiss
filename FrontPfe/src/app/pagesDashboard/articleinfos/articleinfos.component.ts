import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article.model';
import { ArticleService } from 'src/app/services/article.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { QuantitySize } from 'src/app/models/QuantitySize.model';
import { QuantitySizeService } from 'src/app/services/quantity-size.service';

@Component({
  selector: 'app-articleinfos',
  templateUrl: './articleinfos.component.html',
  styleUrls: ['./articleinfos.component.css'],
})
export class ArticleinfosComponent implements OnInit {
  article: Article | undefined;
  currentBigImage: string = '';
  quantitySizeData: QuantitySize[] = [];

  // Define the displayed columns for the mat-table
  quantitySizeDisplayedColumns: string[] = ['labelTaille', 'quantityTaille'];

  // Create a MatTableDataSource with your data
  quantitySizeDataSource = new MatTableDataSource<QuantitySize>(
    this.quantitySizeData
  );

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
    private quantitySizeService: QuantitySizeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const articleId = params['idArticle'];

      if (articleId) {
        this.loadArticleDetails(+articleId);
        this.fetchAvailableSizes(+articleId);
      } else {
        console.error('Invalid article ID.');
      }
    });
  }

  loadArticleDetails(idArticle: number) {
    this.articleService.getArticleById(idArticle).subscribe(
      (article) => {
        this.article = article;
        this.sanitizeImageUrls();
        this.initBigImage(); // Initialize big image
        this.fetchAvailableSizes(+idArticle);
        console.log('Fetched article:', article);
      },
      (error) => {
        console.error('Error fetching article details:', error);
      }
    );
  }

  sanitizeImageUrls() {
    if (this.article && this.article.images) {
      this.article.images.forEach((image) => {
        if (image.url_image) {
          image.url_image = image.url_image.replace(/\\/g, '/');
        }
      });
    }
  }

  initBigImage() {
    if (this.article && this.article.images && this.article.images.length > 0) {
      this.currentBigImage = this.article.images[0].url_image;
    }
  }

  changeBigImage(newImageUrl: string) {
    this.currentBigImage = newImageUrl;
  }

  sanitizeImageUrl(url: string) {
    // Sanitize the URL using DomSanitizer
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  fetchAvailableSizes(idArticle: number) {
    this.quantitySizeService.getAvailableSizesForArticle(idArticle).subscribe(
      (quantitySizes) => {
        console.log('Fetched quantity sizes:', quantitySizes);
        this.quantitySizeData = quantitySizes;
        this.quantitySizeDataSource.data = this.quantitySizeData; // Update MatTableDataSource data
      },
      (error) => {
        console.error('Error fetching available sizes:', error);
      }
    );
  }

  getCategoriesNames(article: Article): string {
    // Extract category names from the article's categories array
    const categoryNames = article.categories.map(
      (category) => category.nomCategory
    );
    return categoryNames.join(',');
  }

  navigateToEditArticle(): void {
    // Assuming you have the article ID
    const articleId = this.article?.idArticle;
    if (articleId) {
      this.router.navigate(['edit-article', articleId]);
    }
  }
  navigateToQuantitiesTaille(): void {
    const articleId = this.article?.idArticle;
    if (articleId) {
      this.router.navigate(['quantities', articleId]);
    }
  }
}
