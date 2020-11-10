package com.challenge1.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

import com.challenge1.backend.registration.controller.RegistrationController;
import com.challenge1.backend.registration.model.UserModel;
import com.challenge1.backend.registration.repository.UserRepository;

import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

@SpringBootTest
public class RegistrationControllerTest {

    @MockBean
    private UserRepository userRepo;
    @InjectMocks
    @Autowired
    private RegistrationController registrationController;

    @Test
    public void testSignup() throws Exception {

        UserModel userModel = new UserModel("1", "User", "user", 8240, "User@123", "user@gmail.com", "TESTING");

        assertEquals("1", userModel.getId());
        assertEquals("User", userModel.getFirstName());
        assertEquals("user", userModel.getLastName());
        assertEquals(8240, userModel.getNumber());
        assertEquals("User@123", userModel.getPassword());
        assertEquals("user@gmail.com", userModel.getEmailId());

    }

    @Test
    public void testLogin() throws Exception {

        UserModel userModel = new UserModel("1", "User", "user", 8240, "User@123", "user@gmail.com", "TESTING");

        assertEquals("user@gmail.com", userModel.getEmailId());
        assertEquals("User@123", userModel.getPassword());

    }

    @Test
    public void testRegistrationController() throws Exception {

        UserModel userModel = new UserModel("1", "User", "user", 8240, "User@123", "user@gmail.com", "TESTING");
        UserModel userModelSame = new UserModel("1", "User", "user", 8240, "User@123", "user@gmail.com", "TESTING");
        UserModel userModelSame1 = new UserModel("1", "User", "user", 8240, "User@1234", "user@gmail.com", "TESTING");

        assertEquals(HttpStatus.OK, registrationController.signup(userModel).getStatusCode());
        assertEquals(HttpStatus.OK, registrationController.signup(userModelSame).getStatusCode());
        assertEquals(HttpStatus.OK, registrationController.login(userModel).getStatusCode());
        assertEquals(HttpStatus.OK, registrationController.login(userModelSame1).getStatusCode());

    }

}
