package com.project.miss.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.project.miss.entites.User;
 
 
	

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
	
	Optional<User> findByEmail(String email);

	@Query("select u from User u where u.email = ?1 and u.password = ?2")
	User findUserByEmailAndPassword(String email, String pwd);
	
	Optional<User> findById(Long iduser);

	List<User> findByRoleUser_RoleName(String roleName);
	
	
}


