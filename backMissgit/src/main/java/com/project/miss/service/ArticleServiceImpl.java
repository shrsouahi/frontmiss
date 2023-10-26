package com.project.miss.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.miss.entites.Article;
import com.project.miss.entites.Category;
import com.project.miss.repository.ArticleRepository;

 

@Service
public class ArticleServiceImpl implements InterArticleService {
	
	
	private ArticleRepository articleRep;
	
	
	@Autowired
	public ArticleServiceImpl(ArticleRepository articleRep) {
		super();
		this.articleRep = articleRep;
	}
	
	public List<Article> getAll(){
		List<Article> listArticles = articleRep.findAll();
		return listArticles;
	}
	
	public Article addArticle(Article article)
	{
		article = articleRep.save(article);
		return article;
	}

	public Article updateArticle(Article newArticle, long idarticle) {
        Optional<Article> existingArticle = articleRep.findById(idarticle);

        if (existingArticle.isPresent()) {
            Article articleToUpdate = existingArticle.get();

           
            articleToUpdate.setBareCode(newArticle.getBareCode());
            articleToUpdate.setCategories(newArticle.getCategories());
            articleToUpdate.setDescriptionArticle(newArticle.getDescriptionArticle());;
            articleToUpdate.setNomArticle(newArticle.getNomArticle());
            articleToUpdate.setPrixArticle(newArticle.getPrixArticle());
            articleToUpdate.setPrixSolde(newArticle.getPrixSolde());
            articleToUpdate.setQuantiteStock(newArticle.getQuantiteStock());
            return articleRep.save(articleToUpdate);
        } else {
            return null; 
        }
    }

	  public String deleteArticleById(long idarticle) {
	        if (articleRep.existsById(idarticle)) {
	            articleRep.deleteById(idarticle);
	            return "Article deleted successfully";
	        } else {
	            return "Article not found";
	        }
	  }
	 
	    public Optional<Article> getArticleById(long idarticle) {
	        return articleRep.findById(idarticle);
	    }

		public Optional<Article> findByBareCode(Integer bareCode) {
			return articleRep.findByBareCode(bareCode);
		}
		
		 public Optional<List<Article>> findByCategories( long codeCategory){
		 
			
	        	
			 return articleRep.findByCategories_CodeCategory(codeCategory);
		 }
			 
		
		

}