package com.challenge1.backend.participationView.controller;

import com.challenge1.backend.participationView.model.QuizSession;
import com.challenge1.backend.participationView.model.ScoreModel;
import com.challenge1.backend.participationView.repository.QuizSessionRepository;
import com.challenge1.backend.participationView.repository.ScoreRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserSessionController {

	private static final Logger logger = LoggerFactory.getLogger(UserSessionController.class);

	@Autowired
	private ScoreRepository scoreRepo;
	@Autowired
	private QuizSessionRepository quizSessionRepo;

	@GetMapping("/start-quiz/{quizId}")
	public boolean incrementParticipants(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Increment Participants API -----");

		QuizSession existingQuizSession = quizSessionRepo.findByQuizId(quizId);

		if (existingQuizSession == null) {

			logger.info("No existing Quiz Session is found in the System");

			QuizSession tempQuizSession = new QuizSession();

			tempQuizSession.setQuizId(quizId);
			tempQuizSession.setNoOfUsers(0);

			quizSessionRepo.save(tempQuizSession);

			logger.info("New Quiz Session is created with Quiz ID " + quizId + " and saved in the System");

			System.out.println(tempQuizSession.getNoOfUsers());

			existingQuizSession = tempQuizSession;

		}

		// existingQuizSession = quizSessionRepo.findByQuizId(quizId);

		existingQuizSession.setNoOfUsers(existingQuizSession.getNoOfUsers() + 1);
		quizSessionRepo.save(existingQuizSession);

		logger.info("Quiz Session is updated and saved in the System");

		System.out.println(existingQuizSession.getNoOfUsers());

		return true;

	}

	@GetMapping("/submit-quiz/{quizId}")
	public boolean decrementParticipants(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Decrement Participants API -----");

		QuizSession quizSession = quizSessionRepo.findByQuizId(quizId);

		quizSession.setNoOfUsers(quizSession.getNoOfUsers() - 1);
		quizSessionRepo.save(quizSession);

		logger.info("Quiz Session is updated and saved in the System");

		return true;
	}

	@GetMapping("/show-live/{quizId}")
	public long countLiveParticipants(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Count Live Participants API -----");

		return quizSessionRepo.findByQuizId(quizId).getNoOfUsers();

	}

	@GetMapping("/totalUsers/{quizId}")
    public long countTotalParticipants(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Count Total Participants API -----");

		ScoreModel scoreModel = scoreRepo.findByQuizId(quizId);

		return scoreModel.getAnswerData().size();

	}

}