package com.project.miss.service;

import java.util.List;

import com.project.miss.entites.Category;

public interface InterCategoryService {
	
	Category saveCategory(Category category);
	
    Category getCategoryById(long id);
    
    void deleteCategory(long id);
    
    List<Category> getAllCategories();
    
    boolean categoryExists(long id);

    List<String> getAllCategoryNames();
}
