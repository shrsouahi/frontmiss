package com.project.miss.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.miss.entites.User;
import com.project.miss.repository.UserRepository;

 

@Service
public class UserServiceImpl implements InterUserService {
	
	
	private UserRepository userRep;
	
	@Autowired
	public UserServiceImpl(UserRepository userRep) {
		super();
		this.userRep = userRep;
	}
	
	public List<User> getAll(){
		List<User> listUsers = userRep.findAll();
		return listUsers;
	}
	
	public User addUser(User user)
	{
		user = userRep.save(user);
		return user;
	}

	public Optional<User> findByEmail(String email) {
		
		return userRep.findByEmail(email);

	}
	 
	public User updateUser(User newUser, Long iduser) {
        Optional<User> existingUser = userRep.findById(iduser);

        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();

           
            userToUpdate.setfName(newUser.getfName());
            userToUpdate.setlName(newUser.getlName());
            userToUpdate.setEmail(newUser.getEmail());
            userToUpdate.setPhone(newUser.getPhone());
            userToUpdate.setPassword(newUser.getPassword());


            return userRep.save(userToUpdate);
        } else {
            return null; 
        }
    }

	  public String deleteUserById(Long iduser) {
	        if (userRep.existsById(iduser)) {
	            userRep.deleteById(iduser);
	            return "User deleted successfully";
	        } else {
	            return "User not found";
	        }
	  }
	 
	    public Optional<User> getUserById(Long iduser) {
	        return userRep.findById(iduser);
	    }
	
	    public List<User> getUsersByRole(String roleName) {
	        
	        return userRep.findByRoleUser_RoleName(roleName);
	    }
	    
	    public User authenticateUser(String email, String password) {
	        // Call the findUserByEmailAndPassword method
	        User user = userRep.findUserByEmailAndPassword(email, password);

	        return user;
	    }

}