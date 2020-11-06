package com.challenge1.backend.participationView.controller;

import java.util.List;

import com.challenge1.backend.participationView.model.ScoreModel;
import com.challenge1.backend.participationView.repository.ScoreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserSessionController {

	private static int counter;

	@Autowired
	private ScoreRepository scoreRepo;

	@GetMapping("/start-quiz")
	public void countLiveParticipants() {

		if (counter == 0) counter = 1;
		else counter++;

		System.out.println(counter);

	}

	@GetMapping("/submit-quiz")
	public void uponSubmission() {

		if (counter > 0) counter--;

	}

	@GetMapping("/show-live")
	public int countLiveUsers() {

		return counter;

	}

	@GetMapping("/totalUsers/{quizId}")
    public long countTotalUsers(@PathVariable(value = "quizId") long quizId) {

		List<ScoreModel> scoreModel = scoreRepo.findAllByQuizId(quizId);

		return scoreModel.size();

	}

}