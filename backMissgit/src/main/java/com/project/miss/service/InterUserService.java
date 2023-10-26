package com.project.miss.service;

import java.util.List;
import java.util.Optional;

import com.project.miss.entites.User;



public interface InterUserService {
	
	
	public List<User> getAll();
	
	public User addUser(User user);
	
	public String deleteUserById( Long iduser);
	
	public User updateUser(User user, Long iduser);
	
	public Optional<User> getUserById(Long iduser);
	
	public List<User> getUsersByRole(String roleName);
	
	public User authenticateUser(String email, String password);


}
