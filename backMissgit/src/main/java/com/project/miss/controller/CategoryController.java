package com.project.miss.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.miss.entites.Category;
import com.project.miss.service.CategoryServiceImpl;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryServiceImpl categoryService;

    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping(value = "/addcategory")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.saveCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable long id) {
        Category category = categoryService.getCategoryById(id);
        if (category != null) {
            return new ResponseEntity<>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping("/category/{id}")
     public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category existingCategory = categoryService.getCategoryById(id);
        
        if (existingCategory == null) {
            return ResponseEntity.notFound().build();
        }
        // Update the properties of the existingCategory with the values from the request
        existingCategory.setNomCategory(category.getNomCategory());
        existingCategory.setDescription(category.getDescription());

        // Save the updated category
        Category updatedCategory = categoryService.saveCategory(existingCategory);

        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        Category existingCategory = categoryService.getCategoryById(id);

        if (existingCategory == null) {
            return ResponseEntity.notFound().build();
        }

        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategoryNames() {
        List<String> categoryNames = categoryService.getAllCategoryNames(); // Assuming you have a method to fetch category names from the database.
        return ResponseEntity.ok(categoryNames);
    }

}
