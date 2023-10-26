package com.project.miss.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.miss.entites.Role;
import com.project.miss.service.RoleServiceImpl;

@RestController
public class RoleController {
	
	@Autowired
	private RoleServiceImpl roleserv;
	
	@PostMapping(value="/addrole")
	
	public Role Addrole(@RequestBody Role role) {
       
		return roleserv.addRole(role);
        
		
	}

	@GetMapping("/allRoles")
	
    public List<Role> getAllRoles() {
		
        return roleserv.getAll();
    }

}