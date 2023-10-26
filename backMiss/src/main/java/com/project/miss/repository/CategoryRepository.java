package com.project.miss.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.miss.entites.Category;
import com.project.miss.entites.Role;

 
public interface CategoryRepository  extends JpaRepository<Category,Long> {
	
    @Query("SELECT c.nomCategory FROM Category c")
    List<String> getAllCategoryNames();
    
    Category findByNomCategory(String nomCategory);

}
