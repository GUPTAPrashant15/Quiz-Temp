package com.challenge1.backend.participationView.controller;

import com.challenge1.backend.participationView.model.QuizSession;
import com.challenge1.backend.participationView.model.ScoreModel;
import com.challenge1.backend.participationView.repository.QuizSessionRepository;
import com.challenge1.backend.participationView.repository.ScoreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserSessionController {

	@Autowired
	private ScoreRepository scoreRepo;
	@Autowired
	private QuizSessionRepository quizSessionRepo;

	@GetMapping("/start-quiz/{quizId}")
	public boolean countLiveParticipants(@PathVariable(value = "quizId") long quizId) {

		QuizSession quizSession = quizSessionRepo.findByQuizId(quizId);

		if (quizSession == null) {

			QuizSession newQuizSession = new QuizSession();

			newQuizSession.setQuizId(quizId);
			newQuizSession.setNoOfUsers(0);

			quizSessionRepo.save(newQuizSession);

			System.out.println(newQuizSession.getNoOfUsers());

		}

		quizSession = quizSessionRepo.findByQuizId(quizId);

		quizSession.setNoOfUsers(quizSession.getNoOfUsers() + 1);

		quizSessionRepo.save(quizSession);

		System.out.println(quizSession.getNoOfUsers());
		return true;

	}

	@GetMapping("/submit-quiz/{quizId}")
	public boolean uponSubmission(@PathVariable(value = "quizId") long quizId) {

		QuizSession quizSession = quizSessionRepo.findByQuizId(quizId);

		quizSession = quizSessionRepo.findByQuizId(quizId);

		quizSession.setNoOfUsers(quizSession.getNoOfUsers() - 1);

		quizSessionRepo.save(quizSession);

		return true;
	}

	@GetMapping("/show-live/{quizId}")
	public long countLiveUsers(@PathVariable(value = "quizId") long quizId) {

		return quizSessionRepo.findByQuizId(quizId).getNoOfUsers();

	}

	
	@GetMapping("/totalUsers/{quizId}")
    public long countTotalUsers(@PathVariable(value = "quizId") long quizId) {

		ScoreModel scoreModel = scoreRepo.findByQuizId(quizId);

		return scoreModel.getAnswerData().size();

	}

}