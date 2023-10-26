package com.project.miss.entites;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Table
@Entity
public class Article {
	
	@Id 
	@GeneratedValue
	private long idArticle;
	private Integer bareCode;
	private String nomArticle;
	private String descriptionArticle;
    private BigDecimal prixArticle;
    private BigDecimal prixSolde;
    private Integer quantiteStock;
    
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "article_id")
    private List<ImageArticle> images = new ArrayList<>();

    
    @ManyToMany
    @JoinTable(
       name = "Category_Article", // The name of the join table
        joinColumns = @JoinColumn(name = "id_article"), // The column in the join table that references this entity
        inverseJoinColumns = @JoinColumn(name = "code_category") // The column in the join table that references the other entity
    )
    private Set<Category> categories = new HashSet<>();
    
    
	public Article() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Article(long idArticle, Integer bareCode, String nomArticle, String descriptionArticle,
			BigDecimal prixArticle, BigDecimal prixSolde, Integer quantiteStock, Set<Category> categories) {
		super();
		this.idArticle = idArticle;
		this.bareCode = bareCode;
		this.nomArticle = nomArticle;
		this.descriptionArticle = descriptionArticle;
		this.prixArticle = prixArticle;
		this.prixSolde = prixSolde;
		this.quantiteStock = quantiteStock;
		this.categories = categories;
	}


	public long getIdArticle() {
		return idArticle;
	}


	public void setIdArticle(long idArticle) {
		this.idArticle = idArticle;
	}


	public Integer getBareCode() {
		return bareCode;
	}


	public void setBareCode(Integer bareCode) {
		this.bareCode = bareCode;
	}


	public String getNomArticle() {
		return nomArticle;
	}


	public void setNomArticle(String nomArticle) {
		this.nomArticle = nomArticle;
	}


	public String getDescriptionArticle() {
		return descriptionArticle;
	}


	public void setDescriptionArticle(String descriptionArticle) {
		this.descriptionArticle = descriptionArticle;
	}


	public BigDecimal getPrixArticle() {
		return prixArticle;
	}


	public void setPrixArticle(BigDecimal prixArticle) {
		this.prixArticle = prixArticle;
	}


	public BigDecimal getPrixSolde() {
		return prixSolde;
	}


	public void setPrixSolde(BigDecimal prixSolde) {
		this.prixSolde = prixSolde;
	}


	public Integer getQuantiteStock() {
		return quantiteStock;
	}


	public void setQuantiteStock(Integer quantiteStock) {
		this.quantiteStock = quantiteStock;
	}


	public Set<Category> getCategories() {
		return categories;
	}


	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}


	

}
