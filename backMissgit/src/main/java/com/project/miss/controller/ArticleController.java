package com.project.miss.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.miss.entites.Article;
import com.project.miss.entites.Category;
import com.project.miss.repository.ArticleRepository;
import com.project.miss.service.ArticleServiceImpl;
import com.project.miss.service.ArticleServiceImpl;

@RequestMapping("/articles")
@RestController
public class ArticleController {

	@Autowired 
	ArticleServiceImpl articleServ;
    
    @PostMapping(value = "/addarticle")
    public ResponseEntity<?> addArticle(@RequestBody Article article) {

        Optional<Article> existingArticle = articleServ.findByBareCode(article.getBareCode());
        if (existingArticle.isPresent()) {	
            return new ResponseEntity<>("Article already exists.", HttpStatus.OK);
        }
        else{
        	article = articleServ.addArticle(article);
        	return new ResponseEntity<>(article, HttpStatus.CREATED);
        }
    }
    
    @GetMapping(value="/getAllArticles")
    public List<Article> getAll(){
		
		return articleServ.getAll();
	}

    @PutMapping("/updateArticle/{idarticle}")
    public Article updateArticle(@RequestBody Article newArticle, @PathVariable Long idarticle) {
        Article updatedArticle = articleServ.updateArticle(newArticle, idarticle);
         return updatedArticle;
        
    }
	
    
    @GetMapping("/article/{idarticle}")
    public ResponseEntity<Article> getArticleById(@PathVariable long idarticle) {
        Optional<Article> article = articleServ.getArticleById(idarticle);
        if (article.isPresent()) {
            return new ResponseEntity<>(article.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    
   
        
        @DeleteMapping("/deleteArticle/{idarticle}")
        public ResponseEntity<Void> deleteArticleById(@PathVariable Long idarticle) {
            Optional<Article> existingArticle= articleServ.getArticleById(idarticle);

            if (existingArticle == null) {
                return ResponseEntity.notFound().build();
            }

            articleServ.deleteArticleById(idarticle);
            return ResponseEntity.noContent().build();
        }
        
        
        @GetMapping(value = "/categorie/{codeCategory}")
        public ResponseEntity<?> getArticleByCategorie(@PathVariable long codeCategory) {
        	
            Optional <List <Article>> articles = articleServ.findByCategories(codeCategory);
            
            if (articles.isPresent()) {	
            	
                return new ResponseEntity<>(articles, HttpStatus.OK);
            }
            else{
            	
            	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
     }
   






