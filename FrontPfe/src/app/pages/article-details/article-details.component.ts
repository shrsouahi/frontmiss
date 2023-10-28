import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | undefined; // Import the Article model

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idarticle = params.get('idarticle');
      console.log('Article ID:', idarticle);
      if (idarticle) {
        this.loadArticleDetails(+idarticle);
      }
    });
  }

  loadArticleDetails(idarticle: number) {
    this.articleService.getArticleById(idarticle).subscribe(
      (article) => {
        this.article = article;
        console.log('Fetched article:', article); // Add this line
      },
      (error) => {
        console.error('Error fetching article details:', error);
      }
    );
  }

  addToCart() {
    // Implement your add to cart logic here
    console.log('Added to cart:', this.article);
  }
}
