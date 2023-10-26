package com.project.miss.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.project.miss.entites.Article;
import com.project.miss.entites.Category;



public interface InterArticleService {
	
	

	public List<Article> getAll();
	
	public Article addArticle(Article article);
	
	public String deleteArticleById(long idarticle);
	
	public Article updateArticle(Article article, long idArticle);
	
	public Optional<Article> getArticleById(long idArticle);
	
	public Optional<Article> findByBareCode(Integer bareCode);

	//public Optional<List<Article>> findByCategories(Set<Category> categories);
	

}
