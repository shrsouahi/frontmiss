package com.project.miss.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.miss.entites.Role;
import com.project.miss.repository.RoleRepository;


@Service
public class RoleServiceImpl implements InterRoleService {

	   
	private RoleRepository roleRep;
	
	@Autowired
	public RoleServiceImpl(RoleRepository roleRep) {
		super();
		this.roleRep = roleRep;
	}
	  
	public List<Role> getAll(){
		List<Role> listRoles = roleRep.findAll();
		return listRoles;
	}


	public Role addRole(Role role) {
	    try {
	        return roleRep.save(role);
	    } catch (Exception e) {
	        e.printStackTrace(); 
	        throw new RuntimeException("Failed to add role"); 
	    }
	}
	
	 public Role findByRoleName(String roleName) {
	        return roleRep.findByRoleName(roleName);
	    }
}



