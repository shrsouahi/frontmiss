package com.project.miss.entites;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table
public class ImageArticle {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url_image;
    
    
    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl_image() {
		return url_image;
	}

	public void setUrl_image(String url_image) {
		this.url_image = url_image;
	}

	public ImageArticle(Long id, String url_image) {
		super();
		this.id = id;
		this.url_image = url_image;
	}

	public ImageArticle() {
		super();
		// TODO Auto-generated constructor stub
	}


}
