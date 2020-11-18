package com.challenge1.backend.createQuiz.repository;


/**
 * <h1>Quiz Repository</h1>
 * <p>
 * This is a Quiz repository interface.
 * This interface extends the Mongo repository which is used for saving and fetching the Quiz 
 * data from the database.
 * </p>
 */
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.challenge1.backend.createQuiz.model.Quiz;

public interface QuizRepository extends MongoRepository<Quiz, Long> {

	/**
	 * This findByUsernameOrderByQuizIdDesc method returns the list of Quiz objects of a particular
	 * user in descending order.
	 * @param userName This is the name of user whose quizzes are to be returned.
	 * 
	 */
	List<Quiz> findByUsernameOrderByQuizIdDesc(String userName);

	/**
	 * This findByQuizId method returns the Quiz having the given quiz Id.
	 * @param quizId This the id of the quiz which is to be returned.
	 * 
	 */
	Quiz findByQuizId(long quizId);

}
