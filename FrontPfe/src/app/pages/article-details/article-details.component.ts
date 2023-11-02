import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article.model';
import { ArticleService } from 'src/app/services/article.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SizeService } from 'src/app/services/size.service';
import { Size } from 'src/app/models/Size.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | undefined;
  sizes: Size[] = [];
  selectedSize: string | undefined;
  currentBigImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
    private sizeService: SizeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idarticle = params.get('idarticle');
      console.log('Article ID:', idarticle);
      if (idarticle) {
        this.loadArticleDetails(+idarticle);
      }
      this.fetchSizes(); // Fetch sizes when the component is initialized
    });
  }

  changeBigImage(newImageUrl: string) {
    this.currentBigImage = newImageUrl;
  }

  loadArticleDetails(idarticle: number) {
    this.articleService.getArticleById(idarticle).subscribe(
      (article) => {
        this.article = article;
        // Replace backslashes with forward slashes in image URLs
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

  addToCart() {
    // Implement your add to cart logic here
    console.log('Added to cart:', this.article);
  }
}
