import { Component } from '@angular/core';
import { Article } from 'src/app/models/Article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent {
  article!: Article;

  constructor(private articleService: ArticleService) {}

  addArticle() {
    this.articleService.addArticle(this.article).subscribe(
      (newArticle) => {
        // Handle success, e.g., show a success message
        console.log('Article added successfully:', newArticle);
      },
      (error) => {
        // Handle error, e.g., show an error message
        console.error('Error adding article:', error);
      }
    );
  }
}
