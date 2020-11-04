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
@CrossOrigin(value="*")
public class CreateQuizController {
	
	
	Logger logger = LoggerFactory.getLogger(CreateQuizController.class);
	
	@Autowired
	private QuizRepository repository;
	
	@Autowired
	private QuestionsRepository quesRepo;
	
	@Autowired
	private SequenceGeneratorService sequenceGenerator;

	@PostMapping("/addQuiz")
	public long saveQuiz(@RequestBody Quiz quiz) {
		
		logger.info("Inside CreateQuizController: saveQuiz() method");
		
		quiz.setQuizId(sequenceGenerator.generateSequence(Quiz.SEQUENCE_NAME));
		
		repository.save(quiz);
		
		logger.info("Inside CreateQuizController: saved the Quiz successfully");
		logger.info(quiz.getQuizId()+"");
		return quiz.getQuizId();
		
	}
	
	@PostMapping("/addQuestions/{id}")
	public String saveQuestions(@RequestBody List<Questions> questions, @PathVariable long id) {
		
		System.out.println(id);
		logger.info("Inside CreateQuizController: saveQuestions() method");
		
		long quesSeq = 1;
		for( Questions question:questions) {
			question.setQuesId(quesSeq);
			quesSeq++;
		}
		
		Optional<Quiz> quiz = repository.findById(id);
		
		if(quiz.isPresent()) {
			quesRepo.updateQuiz(id, questions);
		}
		
		logger.info("Inside CreateQuizController: added questions successfully");
		
		return "Added questions";		
	}
	
	@GetMapping("/")
	public String showEmployee() {
		
		return "Add quiz ";
				
		
	}

	@GetMapping("/list/{username}")
	public List<Quiz> getQuizByUsername(@PathVariable(value="username") String userName){
		
	    List<Quiz> quiz= repository.findByUsername(userName);
	    return quiz;
	}

}


