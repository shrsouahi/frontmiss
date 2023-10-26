package com.project.miss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.miss.entites.Role;

 
 
@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

	Role findByRoleName(String roleName);
}


 
