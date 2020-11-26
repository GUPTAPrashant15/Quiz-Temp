package com.challenge1.backend.registration.controller;

import com.challenge1.backend.registration.model.UserModel;
import com.challenge1.backend.registration.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(RegistrationController.class);

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/hello-reg")
    public String helloRegister() {

        System.out.println("Testing Registration Controller...");
        return "Hello Registration Controller!";

    }

    @PostMapping("/signup")
    public ResponseEntity<UserModel> signup(@RequestBody final UserModel signupUser) {

        logger.info("----- Inside Signup API -----");

        String message;

        UserModel m = new UserModel();

        try {

            String tempEmail = signupUser.getEmailId().toLowerCase();
            UserModel tempUser = userRepo.findByEmailId(tempEmail);

            System.out.println(tempUser);

            if (tempUser != null) { 

                message = "FAILURE";
                m.setMessage(message);

            } else {
                signupUser.setEmailId(signupUser.getEmailId().toLowerCase());
                tempUser = userRepo.save(signupUser);
                message = "SUCCESS";
                System.out.println(message);
                m.setMessage(message);

            }

            logger.info("Signup Status of the" + tempUser + "is" + message);

        } catch (Exception exc) {

            logger.error("Error while Signing Up the User" + exc);

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }

        return new ResponseEntity<>(m, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserModel> login(@RequestBody final UserModel loginUser) {

        logger.info("----- Inside Login API -----");

        UserModel m = new UserModel();

        try {

            String tempEmail = loginUser.getEmailId().toLowerCase();
            String tempPass = loginUser.getPassword();

            UserModel tempUser = userRepo.findByEmailId(tempEmail);

            if (tempUser == null) {

                m.setMessage("FAILURE");

                logger.info(tempEmail + "is not registered in the System");

                return new ResponseEntity<>(m, HttpStatus.OK);

            }

            if (!tempUser.getPassword().equals(tempPass)) {

                m.setMessage("FAILURE1");

                logger.info("User trying to Login has entered the wrong credentials");

                return new ResponseEntity<>(m, HttpStatus.OK);

            }

            m.setMessage("SUCCESS");

            logger.info("User has successfully login in the system");
            // return new ResponseEntity<>(message, HttpStatus.OK);

        } catch (Exception exc) {

            logger.error("Error while logging in the user" + exc);

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }

        return new ResponseEntity<>(m, HttpStatus.OK);

    }

}
