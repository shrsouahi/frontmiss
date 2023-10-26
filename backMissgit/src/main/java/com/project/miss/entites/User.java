package com.project.miss.entites;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class User {
	
	@Id
	@GeneratedValue
	private long idUser;
    private String fName;
    private String lName;
    private String password;
    private String email;
    private String adresse;
    private String region;
    private String ville;
	private Long phone;
	
	@ManyToOne
	@JoinColumn(name="idRole", nullable=false)
    private Role roleUser;
	
	public User() {
		super();
	
	}

	public User(long idUser, String fName, String lName, String password, String email, String adresse, String region,
			String ville, Long phone, Role roleUser) {
		super();
		this.idUser = idUser;
		this.fName = fName;
		this.lName = lName;
		this.password = password;
		this.email = email;
		this.adresse = adresse;
		this.region = region;
		this.ville = ville;
		this.phone = phone;
		this.roleUser = roleUser;
	}

	public long getIdUser() {
		return idUser;
	}

	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public Role getRoleUser() {
		return roleUser;
	}

	public void setRoleUser(Role roleUser) {
		this.roleUser = roleUser;
	}  

}
