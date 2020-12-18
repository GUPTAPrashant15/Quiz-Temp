package com.challenge1.backend.createQuiz.repository;

/**
 * <h1> Questions Repository</h1>
 * 
 * <p>This repository class is used to update the quiz with the list of Questions.</p>
 */
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

	 /**
	  * This updateQuiz method is used to update the quiz with the list of questions provided.
	  * 
	  * @param id This is the id of the quiz which is to be updated.
	  * @param questions This is the list of questions which is to be inserted in the quiz.
	  */
	 public void updateQuiz(long id,List<Questions> questions) {
		 
		 mongoOperation.findAndModify(
					query(where("_id").is(id)),
					new Update().set("questions",questions),
					Quiz.class
					);
	 }

}

