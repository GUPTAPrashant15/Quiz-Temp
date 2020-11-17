package com.challenge1.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.challenge1.backend.participationView.controller.UserSessionController;
import com.challenge1.backend.participationView.model.AnswerData;
import com.challenge1.backend.participationView.model.QuizSession;
import com.challenge1.backend.participationView.model.ScoreModel;
import com.challenge1.backend.participationView.repository.QuizSessionRepository;
import com.challenge1.backend.participationView.repository.ScoreRepository;


@SpringBootTest
public class UserSessionControllerTest {

	@InjectMocks
	private UserSessionController userSessionController;
	
	@Mock
	private QuizSessionRepository quizSessionRepo;
	
	@Mock
	private ScoreRepository scoreRepo;
	
	private ScoreModel scoreModel;
	
	private AnswerData answerData;
	
	private QuizSession quizSession;
	
	@Test
	public void testIncrementParticipants() {
		
		quizSession=new QuizSession(123,9);
		
		when(quizSessionRepo.findByQuizId(123)).thenReturn(quizSession);
		
		boolean returnValue=userSessionController.incrementParticipants(123);
		
		assertEquals(true,returnValue);
	 
	}
	@Test
	public void testDecrementParticipants() {
		
		quizSession=new QuizSession(123,9);
		
		when(quizSessionRepo.findByQuizId(123)).thenReturn(quizSession);
		
		boolean returnValue=userSessionController.decrementParticipants(123);
		
		assertEquals(true,returnValue);
	 
	}
	
	@Test
	public void testCountLiveParticipants() {
		
		quizSession=new QuizSession(123,9);
		
		long value=9;
		
		when(quizSessionRepo.findByQuizId(123)).thenReturn(quizSession);
		
		long returnValue=userSessionController.countLiveParticipants(123);
		
		assertEquals(value,returnValue);
		
	}
	
	@Test
	public void testCountTotalParticipants(){
		
		long value=1;
		
		answerData=new AnswerData("xyz",4, null);
        List<AnswerData> answerList=new ArrayList<AnswerData>();
        answerList.add(answerData);
		
		scoreModel=new ScoreModel();
		scoreModel.setQuizId(123);
		scoreModel.setAnswerData(answerList);
		when(scoreRepo.findByQuizId(123)).thenReturn(scoreModel);
		long returnValue=userSessionController.countTotalParticipants(123);
		assertEquals(returnValue,value);		
	}	
}
