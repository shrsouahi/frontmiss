package com.project.miss.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.project.miss.entites.Article;
import com.project.miss.entites.Category;
import com.project.miss.entites.User;

 
 
	

@Repository
public interface ArticleRepository extends JpaRepository<Article,Long>{


	Optional<Article> findByBareCode(Integer bareCode);
	
	//Optional<List<Article>> findByCategories(Set<Category> categories);
	
	Optional<List<Article>> findByCategories_CodeCategory(long codeCategory);
}


