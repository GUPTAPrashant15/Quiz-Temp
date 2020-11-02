
package com.challenge1.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuizPortalBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizPortalBackendApplication.class, args);
		System.out.println("Server up and running at Port 8080!");
	}

}
