package com.project.miss.controller;

import java.util.List;
import java.util.Optional;

import javax.management.relation.RoleNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.miss.entites.Role;
import com.project.miss.entites.User;
import com.project.miss.repository.UserRepository;
import com.project.miss.service.RoleServiceImpl;
import com.project.miss.service.UserServiceImpl;

@RequestMapping("/users")
@RestController
public class UserController {

	@Autowired 
	UserServiceImpl userServ;

    @Autowired
    RoleServiceImpl roleService;

    @Autowired
     private UserRepository userRep; 
    
    @PostMapping(value = "/adduser")
    public ResponseEntity<?> addUser(@RequestBody User user) throws RoleNotFoundException {

        Role role = roleService.findByRoleName("Client");
        
        if (role == null) {
        	
            throw new RoleNotFoundException("Role not found.");
        }
        // Check if the email already exists
        Optional<User> existingUser = userServ.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
        	return new ResponseEntity<>("Email already exists.", HttpStatus.OK);
        }
        user.setRoleUser(role);
        userServ.addUser(user);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
    
    @GetMapping(value="/getAllUsers")
     
    public List<User> getAll(){
		
		return userServ.getAll();
	}

    @PutMapping("/updateUser/{iduser}")
    public User updateUser(@RequestBody User newUser, @PathVariable Long iduser) {
        User updatedUser = userServ.updateUser(newUser, iduser);
         return updatedUser;
        
    }
	
    @DeleteMapping("/deleteUser/{iduser}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long iduser) {
        if (userRep.existsById(iduser)) {
            userRep.deleteById(iduser);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/user/{iduser}")
    public ResponseEntity<User> getUserById(@PathVariable Long iduser) {
        Optional<User> user = userServ.getUserById(iduser);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
   
    @GetMapping("/byRole/{roleName}")
     public ResponseEntity<List<User>> getUsersByRole(@PathVariable String roleName) {
        List<User> users = userServ.getUsersByRole(roleName);
        
        if (!users.isEmpty()) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    
    
    
    @PostMapping("/signin")
    public ResponseEntity<User> signIn(@RequestBody User user) {
        User authenticatedUser = userServ.authenticateUser(user.getEmail(), user.getPassword());

        if (authenticatedUser != null) {
            // Authentication successful, you can now generate a token
            return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
        } else {
            // Authentication failed
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }


	}


