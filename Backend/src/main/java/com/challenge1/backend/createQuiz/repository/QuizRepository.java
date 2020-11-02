package com.challenge1.backend.createQuiz.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.challenge1.backend.createQuiz.model.Quiz;

public interface QuizRepository extends MongoRepository<Quiz,Long> {

	List<Quiz> findByUsername(String userName);
	

}
