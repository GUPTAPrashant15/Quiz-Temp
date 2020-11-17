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

	@PostMapping("/addQuiz")
	public long saveQuiz(@RequestBody Quiz quiz) {

		logger.info("Inside CreateQuizController: saveQuiz() method");

		quiz.setQuizId(sequenceGenerator.generateSequence(Quiz.SEQUENCE_NAME));

		quizRepo.save(quiz);

		logger.info("Inside CreateQuizController: saved the Quiz successfully");
		logger.info("Quiz Id for the recently created quiz is "+quiz.getQuizId() + "");

		return quiz.getQuizId();

	}

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

	@GetMapping("/realtimeanalysis/{quizId}")
	public Quiz getQuizById(@PathVariable(value = "quizId") long id) {

		Quiz quiz = quizRepo.findById(id).get();

		return quiz;

	}
	
	@GetMapping("/anlysis-result/{quizId}")
	public Quiz getQuizByresultId(@PathVariable(value = "quizId") long id) {

		Quiz quiz = quizRepo.findById(id).get();

		return quiz;

	}

	@PostMapping(value="/changeQuizStatus/{quizId}")
	public boolean toggleQuizStatus(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Quiz Status Toggler API -----");

		Quiz quizModel = quizRepo.findByQuizId(quizId);
		boolean isQuizLive = quizModel.isLiveStatus();

		if(isQuizLive) quizModel.setLiveStatus(false);
		else quizModel.setLiveStatus(true);

		quizRepo.save(quizModel);

		logger.info("Quiz Status has been changed and updated in the System");

		return quizModel.isLiveStatus();

	}
	@GetMapping(value="/getQuizStatus/{quizId}")
	public boolean getQuizStatus(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Quiz Status Retriever API -----");

		return quizRepo.findByQuizId(quizId).isLiveStatus();

	}

}
