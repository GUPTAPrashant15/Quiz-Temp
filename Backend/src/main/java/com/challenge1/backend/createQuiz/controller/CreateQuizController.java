package com.challenge1.backend.createQuiz.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.challenge1.backend.createQuiz.model.Questions;
import com.challenge1.backend.createQuiz.model.Quiz;
import com.challenge1.backend.createQuiz.repository.QuestionsRepository;
import com.challenge1.backend.createQuiz.repository.QuizRepository;
import com.challenge1.backend.createQuiz.service.SequenceGeneratorService;

/**
 * <h1> Create Quiz Controller</h1>
 * Provides REST-APIs for creating Quiz and fetching Quiz data.
 * 
 * <p>This is a Create Quiz Controller which implements all the methods for creating a Quiz and 
 * fetching all the details of a Quiz.</p>
 *
 */

@RestController
@CrossOrigin(value = "*")
public class CreateQuizController {

	private static final Logger logger = LoggerFactory.getLogger(CreateQuizController.class);

	@Autowired
	private QuizRepository quizRepo;

	@Autowired
	private QuestionsRepository quesRepo;

	@Autowired
	private SequenceGeneratorService sequenceGenerator;

	@GetMapping("/")
	public String demoQuizAdd() {

		return "Demo Quiz Addition";

	}

	/**
	 * 
	 * This saveQuiz method is used to save the quiz created by a quiz master.
	 * 
	 * @param quiz of type Quiz containing the details of a Quiz.
	 * @return id of the quiz created.
	 * @see com.challenge1.backend.createQuiz.model.Quiz
	 * 
	 */
	@PostMapping("/addQuiz")
	public long saveQuiz(@RequestBody Quiz quiz) {

		logger.info("Inside CreateQuizController: saveQuiz() method");

		quiz.setQuizId(sequenceGenerator.generateSequence(Quiz.SEQUENCE_NAME));

		quizRepo.save(quiz);

		logger.info("Inside CreateQuizController: saved the Quiz successfully");
		logger.info("Quiz Id for the recently created quiz is "+quiz.getQuizId() + "");

		return quiz.getQuizId();

	}

	/**
	 * 
	 * This saveQuestions method is used to add questions in the created quiz.
	 * 
	 * some variables used in this method are
	 * <ul>
	 * 		<li>quesSeq: long variable</li>
	 * 		<li>question: object of type Questions</li>
	 * 		<li>quiz: an Optional object of Quiz </li>
	 * </ul>
	 * 
	 * @param questions This is the list of objects of type Questions.
	 * @param quizId This is the id of the quiz in which questions are to be added.
	 * @return string success message "Added questions".
	 * 
	 * @see com.challenge1.backend.createQuiz.model.Questions
	 * @see com.challenge1.backend.createQuiz.model.Quiz
	 * 
	 */
	@PostMapping("/addQuestions/{id}")
	public String saveQuestions(@RequestBody List<Questions> questions, @PathVariable(value = "id") long quizId) {

		System.out.println(quizId);

		logger.info("Inside CreateQuizController: saveQuestions() method");

		long quesSeq = 1;

		for (Questions question : questions) {
			question.setQuesId(quesSeq);
			quesSeq++;
		}

		Optional<Quiz> quiz = quizRepo.findById(quizId);

		if (quiz.isPresent()) quesRepo.updateQuiz(quizId, questions);

		logger.info("Inside CreateQuizController: added questions successfully");

		return "Added questions";
	}

	@GetMapping("/list/{username}")
	public List<Quiz> getQuizByUsername(@PathVariable(value = "username") String userName) {

		List<Quiz> quiz = quizRepo.findByUsernameOrderByQuizIdDesc(userName);

		return quiz;

	}

	/**
	 * 
	 * This getQuizById method is used to return a quiz.
	 * 
	 * some variables used in this method are
	 * <ul>
	 * 		<li>quiz: List of objects of type Quiz.</li>
	 * </ul>
	 * 
	 * @param id This is the quiz Id of the quiz to be returned.
	 * @return quiz having the particular quiz Id.
	 * 
	 * @see com.challenge1.backend.createQuiz.model.Quiz
	 */
	@GetMapping("/realtimeanalysis/{quizId}")
	public Quiz getQuizById(@PathVariable(value = "quizId") long id) {

		Quiz quiz = quizRepo.findById(id).get();
        System.out.println(quiz.toString());
		return quiz;

	}
	
//	/**
//	 * 
//	 * This getQuizByResultId method is used find a quiz by the quizId.
//	 * 
//	 * some variables used in this method are
//	 * <ul>
//	 * 		<li>quiz: List of objects of type Quiz.</li>
//	 * </ul> 
//	 * 
//	 * @param id This is the quiz Id of the quiz to be returned.
//	 * @return quiz having the particular quiz Id.
//	 * 
//	 * @see com.challenge1.backend.createQuiz.model.Quiz
//	 */
//	@GetMapping("/anlysis-result/{quizId}")
//	public Quiz getQuizByresultId(@PathVariable(value = "quizId") long id) {
//
//		Quiz quiz = quizRepo.findById(id).get();
//
//		return quiz;
//
//	}

	/**
	 * 
	 * This toggleQuizStatus method is used to change the status of the quiz.
	 * 
	 * some variables used in this method are
	 * <ul>
	 * 		<li>quizModel: An object of type Quiz.</li>
	 * 		<li>isQuizLive: boolean variable.</li>
	 * </ul>
	 * 
	 * @param quizId This is the id of the quiz whose status is to be changed.
	 * @return IsLiveStatus of the quiz.
	 * 
	 * @see com.challenge1.backend.createQuiz.model.Quiz
	 * 
	 */
	@PostMapping(value="/changeQuizStatus/{quizId}")
	public boolean toggleQuizStatus(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Quiz Status Toggler API -----");

		Quiz quizModel = quizRepo.findByQuizId(quizId);
		boolean isQuizLive = quizModel.getIsLiveStatus();

		if(isQuizLive) quizModel.setIsLiveStatus(false);
		else quizModel.setIsLiveStatus(true);

		quizRepo.save(quizModel);

		logger.info("Quiz Status has been changed and updated in the System");

		return quizModel.getIsLiveStatus();

	}
	
	/**
	 * 
	 * This getQuizStatus method is used to return the quiz status.
	 * 
	 * @param quizId This is the id of the quiz whose status is to be returned.
	 * @return IsLiveStatus of the quiz.
	 * 
	 */
	@GetMapping(value="/getQuizStatus/{quizId}")
	public boolean getQuizStatus(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Quiz Status Retriever API -----");

		return quizRepo.findByQuizId(quizId).getIsLiveStatus();

	}

}
