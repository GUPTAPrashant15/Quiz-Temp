package com.challenge1.backend.participationView.repository;

import com.challenge1.backend.participationView.model.ScoreModel;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ScoreRepository extends MongoRepository<ScoreModel, Long> {

	ScoreModel findByQuizId(long quizId);

}
