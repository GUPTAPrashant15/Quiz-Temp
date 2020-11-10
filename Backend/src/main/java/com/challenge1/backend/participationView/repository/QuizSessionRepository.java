package com.challenge1.backend.participationView.repository;

import com.challenge1.backend.participationView.model.QuizSession;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizSessionRepository extends MongoRepository<QuizSession, Long> {

    QuizSession findByQuizId(long quizId);

}
