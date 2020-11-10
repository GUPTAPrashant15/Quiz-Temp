package com.challenge1.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.challenge1.backend.registration.model.UserModel;
import com.challenge1.backend.registration.repository.UserRepository;
import com.challenge1.backend.resetpassword.controller.ResetPasswordController;
import com.challenge1.backend.resetpassword.model.ResetPasswordModel;
import com.challenge1.backend.resetpassword.repository.ResetPasswordRepository;
import com.fasterxml.jackson.core.JsonProcessingException;

@SpringBootTest
public class ResetPasswordControllerTest {

	@Autowired
	@InjectMocks
	private ResetPasswordController resetPasswordController;

	@Mock
	private UserModel userModel;

	// @Autowired
	@Mock
	private UserRepository userRepo;

	@Mock
	private ResetPasswordModel resetPasswordModel;

	@Mock
	private ResetPasswordRepository resetRepo;

	@Test
	public void testSendOTP() {

		resetPasswordModel.setEmailId("mukultyagi20798@gmail.com");
		resetPasswordModel.setMessage("SUCCESS");
		resetPasswordModel.setOtp("123456");
		resetPasswordModel.setId(new ObjectId());

		userModel = new UserModel();
		userModel.setEmailId("mukultyagi20798@gmail.com");
		userModel.setFirstName("Mukul");
		userModel.setId("1");
		userModel.setLastName("Tyagi");
		userModel.setMessage("Hi Test Executed nicely");
		userModel.setNumber(12345);
		userModel.setPassword("123456");

		when(userRepo.findByEmailId("mukultyagi20798@gmail.com")).thenReturn(userModel);

		when(resetRepo.findByEmailId("mukultyagi20798@gmail.com")).thenReturn(resetPasswordModel);

		ResponseEntity<ResetPasswordModel> response = resetPasswordController.sendOTP(resetPasswordModel);

		assertEquals(HttpStatus.OK, response.getStatusCode());

	}

	@Test
	public void testVerifyOTP() {
		resetPasswordModel.setEmailId("mukultyagi20798@gmail.com");
		resetPasswordModel.setMessage("SUCCESS");
		resetPasswordModel.setOtp("123456");
		resetPasswordModel.setId(new ObjectId());

		when(resetRepo.findByEmailIdAndOtp("mukultyagi20798@gmail.com", "123456")).thenReturn(resetPasswordModel);
		ResponseEntity<ResetPasswordModel> response = resetPasswordController.verifyOTP(resetPasswordModel);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	public void testResetPasswordModel() throws JsonProcessingException {

		userModel = new UserModel();
		userModel.setEmailId("mukultyagi20798@gmail.com");
		userModel.setFirstName("Mukul");
		userModel.setId("1");
		userModel.setLastName("Tyagi");
		userModel.setMessage("Hi Test Executed nicely");
		userModel.setNumber(12345);
		userModel.setPassword("123456");

		when(userRepo.findByEmailId("mukultyagi20798@gmail.com")).thenReturn(userModel);

		ResponseEntity<ResetPasswordModel> response = resetPasswordController.resetPassword(userModel);
		assertEquals(HttpStatus.OK, response.getStatusCode());

	}

	@Test
	public void testGenerateOTP() {

		assertEquals(6, ResetPasswordController.generateOTP(6).length);
		assertEquals(5, ResetPasswordController.generateOTP(5).length);
		assertEquals(4, ResetPasswordController.generateOTP(4).length);
		assertEquals(9, ResetPasswordController.generateOTP(9).length);

	}

}
