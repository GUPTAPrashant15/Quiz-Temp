package com.challenge1.backend.createQuiz.repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.challenge1.backend.createQuiz.model.Questions;
import com.challenge1.backend.createQuiz.model.Quiz;

@Repository
public class QuestionsRepository{
	
	private MongoOperations mongoOperation;
	
	 @Autowired
	 public QuestionsRepository(MongoOperations mongoOperations) {
		 this.mongoOperation = mongoOperations;
	 }

	 public void updateQuiz(long id,List<Questions> questions) {
		 
		 mongoOperation.findAndModify(
					query(where("_id").is(id)),
					new Update().set("questions",questions),
					Quiz.class
					);
	 }

}

