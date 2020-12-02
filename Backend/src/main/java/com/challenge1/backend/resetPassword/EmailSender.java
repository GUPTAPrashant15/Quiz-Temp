
package com.challenge1.backend.resetPassword;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Controller;

@Controller
// @ComponentScan
public class EmailSender /* implements CommandLineRunner */ {

    @Autowired
    private JavaMailSender javaMailSender;

    /*

    @GetMapping("/forgot-password")
    @Override
    public void run(String... args) throws MessagingException, IOException {

        System.out.println("Sending Email...");

        sendEmail("aarushig85@gmail.com", "123456");

        System.out.println("Done!");

    }

    */

    public void sendEmail(String email, String otp) {

        System.out.println("Testing Email Sender...");

        SimpleMailMessage msg = new SimpleMailMessage();

        msg.setTo(email);

        msg.setSubject("Reset Password for SBSI Quiz Portal");
        msg.setText("\nDear User,\nYour OTP to reset your Password is " + otp + ". This OTP is valid only for 10 minutes.\n\nRegards,\nSBSI Iridsparkz 2020 Team");

        javaMailSender.send(msg);

    }

    @Bean
    public JavaMailSender getJavaMailSender() {

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("sbsi.quiz@gmail.com");
        mailSender.setPassword("Spartans@123");

        Properties props = mailSender.getJavaMailProperties();

        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "false");

        return mailSender;

    }

}