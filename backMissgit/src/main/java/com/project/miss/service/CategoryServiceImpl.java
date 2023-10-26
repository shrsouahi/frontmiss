package com.project.miss.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.project.miss.entites.Category;
import com.project.miss.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements InterCategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

  
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

   
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public void deleteCategory(long id) {
        categoryRepository.deleteById(id);
    }

  
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public boolean categoryExists(long id) {
        return categoryRepository.existsById(id);
    }
    
    public List<String> getAllCategoryNames() {
        return categoryRepository.getAllCategoryNames();
    }
}

