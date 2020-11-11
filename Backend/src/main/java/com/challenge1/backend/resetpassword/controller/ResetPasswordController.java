
package com.challenge1.backend.resetpassword.controller;

import java.util.Random;

import com.challenge1.backend.registration.model.UserModel;
import com.challenge1.backend.registration.repository.UserRepository;
import com.challenge1.backend.resetpassword.EmailSender;
import com.challenge1.backend.resetpassword.model.ResetPasswordModel;
import com.challenge1.backend.resetpassword.repository.ResetPasswordRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ResetPasswordController {
    Logger logger = LoggerFactory.getLogger(ResetPasswordController.class);
    @Autowired
    private EmailSender emailSender;

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ResetPasswordRepository resetRepo;

    @GetMapping("/hello-res")
    public String helloReset() {

        System.out.println("Testing Reset Password Controller...");
        return "Hello Reset Password Controller!";

    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ResetPasswordModel> sendOTP(@RequestBody final ResetPasswordModel resetUser) {
        logger.info("----Inside Forget Password API----");
        String message;

        ResetPasswordModel resModel = new ResetPasswordModel();

        UserModel existingUser = null;

        // Check if the Email is valid or not
        try {
            existingUser = userRepo.findByEmailId(resetUser.getEmailId());

        } catch (Exception exc) { 
            exc.printStackTrace();
            logger.error("Error while searching for the existing email for resetting the password : " + exc);
        
        }

        // If the User with the Email exists,
        // save the User Email and the OTP generated, and also, send the Email
        if (existingUser != null) {

            String otp = String.valueOf(generateOTP(6));

            ResetPasswordModel otpUser = resetRepo.findByEmailId(resetUser.getEmailId());

            if (otpUser == null) otpUser = resetUser;

            otpUser.setOtp(otp);

            try {

                resetRepo.save(otpUser);
                emailSender.sendEmail(otpUser.getEmailId(), String.valueOf(otp));
                logger.info("email has been sent successfully to the : " +otpUser.getEmailId());

            } catch (Exception exc) { 
                exc.printStackTrace(); 
                logger.error("Error while sending the email : " + exc);
            }

            message = "SUCCESS";
            resModel.setMessage(message);
        

            return new ResponseEntity<>(resModel, HttpStatus.OK);

        }

        message = "FAILURE";
        resModel.setMessage(message);
        System.out.println(message);
        logger.warn("User with the email does not exist");
        return new ResponseEntity<>(resModel, HttpStatus.OK);

    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ResetPasswordModel> verifyOTP(@RequestBody final ResetPasswordModel resetUser) {

        String message;
        ResetPasswordModel resModel = new ResetPasswordModel();

        logger.info("----Testing Verify OTP API----");

        ResetPasswordModel existingUser = null;
        
        try {

            existingUser = resetRepo.findByEmailIdAndOtp(resetUser.getEmailId(), resetUser.getOtp());
            

        } catch (Exception exc) { 
            exc.printStackTrace(); 
            logger.error("Error while verifying the otp : " + exc);
        }

        if (existingUser != null) {

            message = "SUCCESS";
            resModel.setMessage(message);
            System.out.println(message);

            resetRepo.delete(existingUser);
            logger.info("Otp has been verified successfully for : "+existingUser.getEmailId());

        } else {

            message = "FAILURE";
            resModel.setMessage(message);
            System.out.println(message);
            logger.info("The Email or Otp is incorrect. Please check again.");

        }

        return new ResponseEntity<>(resModel, HttpStatus.OK);

    }

    @PutMapping("/reset-password")
    public ResponseEntity<ResetPasswordModel> resetPassword(@RequestBody final UserModel resetPasswordUser) {

        String message;
        ResetPasswordModel resModel = new ResetPasswordModel();
        logger.info("----Inside Reset Password API----");

        UserModel recentUser;

        try {
            recentUser = userRepo.findByEmailId(resetPasswordUser.getEmailId());
            recentUser.setPassword(resetPasswordUser.getPassword());
            userRepo.save(recentUser);
            message = "SUCCESS";
            resModel.setMessage(message);
            logger.info("Password has been reset successfully for : " +resetPasswordUser.getEmailId());

            //return new ResponseEntity<>(message, HttpStatus.OK);

        } catch (Exception exc) { 
            //exc.printStackTrace(); 
            message = "FAILURE";
            logger.error("Error while resetting the password : " + exc);
            resModel.setMessage(message);
        }
        
        return new ResponseEntity<>(resModel, HttpStatus.OK);

    }

    public static char[] generateOTP(int length) {

        String numbers = "1234567890";
        Random random = new Random();

        char[] otp = new char[length];

        for (int i = 0; i < length; i++) {
            otp[i] = numbers.charAt(random.nextInt(numbers.length()));
        }

        return otp;

    }

}
