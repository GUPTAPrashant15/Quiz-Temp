package com.challenge1.backend.participationView.repository;

import java.util.List;

import com.challenge1.backend.participationView.model.ScoreModel;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ScoreRepository extends MongoRepository<ScoreModel, String> {

	ScoreModel findByUserName(String userName);

	// ScoreModel findByQuizId(long quizId);

	List<ScoreModel> findAllByQuizId(long quizId);

}
