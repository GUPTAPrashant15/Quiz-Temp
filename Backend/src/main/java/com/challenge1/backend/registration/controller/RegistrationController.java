package com.challenge1.backend.registration.controller;

import com.challenge1.backend.registration.model.UserModel;
import com.challenge1.backend.registration.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
// @RequestMapping("/register")
public class RegistrationController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/hello-reg")
    public String helloRegister() {

        System.out.println("Testing Registration Controller...");
        return "Hello Registration Controller!";

    }

    @PostMapping("/signup")
    public ResponseEntity<UserModel> signup(@RequestBody final UserModel signupUser) {

        String message;
        UserModel m = new UserModel();

        System.out.println("Testing Signup API...");

        try {

            String tempEmail = signupUser.getEmailId();

            UserModel tempUser = userRepo.findByEmailId(tempEmail);
            System.out.println(tempUser);
            if (tempUser != null) {

                message = "FAILURE";
                // System.out.println(message);
                m.setMessage(message);

                // return m;
                // return new ResponseEntity<>(m, HttpStatus.UNAUTHORIZED);
            } else {
                tempUser = userRepo.save(signupUser);

                message = "SUCCESS";
                System.out.println(message);
                m.setMessage(message);

                // return new ResponseEntity<>(m, HttpStatus.CREATED);
                // return m;
            }
        } catch (Exception exc) {

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }

        return new ResponseEntity<>(m, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserModel> login(@RequestBody final UserModel loginUser) {

        // String message;
        UserModel m = new UserModel();
        System.out.println("Testing Login API...");

        try {

            String tempEmail = loginUser.getEmailId();
            String tempPass = loginUser.getPassword();

            UserModel tempUser = userRepo.findByEmailId(tempEmail);

            if (tempUser == null) {

                m.setMessage("FAILURE");
                // System.out.println(message);

                return new ResponseEntity<>(m, HttpStatus.OK);

            }

            if (!tempUser.getPassword().equals(tempPass)) {

                m.setMessage("FAILURE1");
                System.out.println("FAILURE 1");

                return new ResponseEntity<>(m, HttpStatus.OK);

            }

            m.setMessage("SUCCESS");
            System.out.println("SUCCESS");

            // return new ResponseEntity<>(message, HttpStatus.OK);

        } catch (Exception exc) {
            System.out.println(exc);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
        return new ResponseEntity<>(m, HttpStatus.OK);
    }

}
