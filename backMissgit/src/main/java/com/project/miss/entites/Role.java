package com.project.miss.entites;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.Id;
	import jakarta.persistence.Table;

	@Entity
	@Table
	public class Role {
		@Id
		@GeneratedValue
		private long idRole;
		private String roleName;
		

		
		public Role() {
			super();
		}

		
		public Role(long idRole, String roleName) {
			super();
			this.idRole = idRole;
			this.roleName = roleName;
		}


		public Long getIdRole() {
			return idRole;
		}


		public void setIdRole(Long idRole) {
			this.idRole = idRole;
		}


		public String getRoleName() {
			return roleName;
		}


		public void setRoleName(String roleName) {
			this.roleName = roleName;
		}

		
	
}
