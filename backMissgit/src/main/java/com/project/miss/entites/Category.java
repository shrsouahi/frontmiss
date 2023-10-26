package com.project.miss.entites;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Category {

	@Id
	@GeneratedValue
	private long codeCategory;
	private String nomCategory;
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "parentId")
	private Category parentCategory;
    
	@ManyToMany
	@JoinTable(
	   name = "Category_Article", // The name of the join table
	   joinColumns = @JoinColumn(name = "code_category"), // The column in the join table that references this entity
	   inverseJoinColumns = @JoinColumn(name = "id_article") // The column in the join table that references the other entity
	)
	private Set<Article> articles = new HashSet<Article>();

	
	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Category(long codeCategory, String nomCategory, String description, Category parentCategory,
			Set<Article> articles) {
		super();
		this.codeCategory = codeCategory;
		this.nomCategory = nomCategory;
		this.description = description;
		this.parentCategory = parentCategory;
		this.articles = articles;
	}

	public long getCodeCategory() {
		return codeCategory;
	}
	public void setCodeCategory(long codeCategory) {
		this.codeCategory = codeCategory;
	}
	public String getNomCategory() {
		return nomCategory;
	}
	public void setNomCategory(String nomCategoty) {
		this.nomCategory = nomCategoty;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	// Getters and setters for parentCategory

    public Category getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(Category parentCategory) {
        this.parentCategory = parentCategory;
    }
}


