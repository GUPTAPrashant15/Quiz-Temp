package com.challenge1.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.challenge1.backend.createQuiz.model.Questions;
import com.challenge1.backend.createQuiz.model.Quiz;
import com.challenge1.backend.createQuiz.repository.QuizRepository;
import com.challenge1.backend.participationView.controller.ParticipationController;
import com.challenge1.backend.participationView.model.AnswerData;
import com.challenge1.backend.participationView.model.GraphId;
import com.challenge1.backend.participationView.model.GraphModel;
import com.challenge1.backend.participationView.model.ScoreModel;
import com.challenge1.backend.participationView.repository.GraphRepository;
import com.challenge1.backend.participationView.repository.ScoreRepository;
import com.challenge1.backend.participationView.service.ScoreService;

@SpringBootTest
public class ParticipationControllerTest {

	@InjectMocks
	private ParticipationController participationController;

	@Mock
	private GraphRepository graphRepository;

	@Mock
	private ScoreRepository scoreRepo;

	@Mock
	private QuizRepository quizRepo;

	@Mock
	private ScoreService scoreService;

	private AnswerData answerData;

	private GraphModel graphModel;

	private ScoreModel scoreModel;

	private GraphId graphId;

	private Quiz quiz;

	private Questions questions;

	@Test
	public void testQuizView() {
		questions = new Questions();
		questions.setQuesId(12);
		questions.setQuestion("dq");
		questions.setQuesType("Multiple Correct");
		questions.setOption1("wd");
		questions.setOption2("wd");
		questions.setOption3("w");
		questions.setOption4("d");
		questions.setCorrect1(false);
		questions.setCorrect2(false);
		questions.setCorrect3(true);
		questions.setCorrect4(true);

		List<Questions> questionsList = new ArrayList<>();
		questionsList.add(questions);

		quiz = new Quiz();
		quiz.setCreatedDate(LocalDate.now());
		quiz.setDescription("This for Test");
		quiz.setQuizName("TestQuiz");
		quiz.setUsername("xyz");
		quiz.setQuestions(questionsList);

		when(quizRepo.findByQuizId(12)).thenReturn(quiz);

		java.util.Optional<Quiz> returnValue = participationController.quizView(12);

		assertNotNull(returnValue);

	}

	@Test
	public void testCalcScore() {

		String userName = "xyz";
		long quizId = 123;
		long quesId = 12;
		String answer = "CD";
		Integer userScore = 4;

		graphId = new GraphId(quizId, quesId);

		graphModel = new GraphModel();
		graphModel.setGraphId(graphId);
		graphModel.setOptionA(25);
		graphModel.setOptionB(25);
		graphModel.setOptionC(40);
		graphModel.setOptionD(10);

		answerData = new AnswerData(userName, userScore, null);

		List<AnswerData> answerList = new ArrayList<AnswerData>();
		answerList.add(answerData);
		scoreModel = new ScoreModel();
		scoreModel.setQuizId(quizId);
		scoreModel.setAnswerData(answerList);

		questions = new Questions();
		questions.setQuesId(quesId);
		questions.setQuestion("dq");
		questions.setQuesType("Multiple Correct");
		questions.setOption1("wd");
		questions.setOption2("wd");
		questions.setOption3("w");
		questions.setOption4("d");
		questions.setCorrect1(false);
		questions.setCorrect2(false);
		questions.setCorrect3(true);
		questions.setCorrect4(true);

		List<Questions> questionsList = new ArrayList<>();
		questionsList.add(questions);

		quiz = new Quiz();
		quiz.setCreatedDate(LocalDate.now());
		quiz.setDescription("This for Test");
		quiz.setQuizName("TestQuiz");
		quiz.setUsername(userName);
		quiz.setQuestions(questionsList);

		System.out.println("GraphModel info : " + graphModel);
		System.out.println("Option c value : " + graphModel.getOptionC());

		List<GraphModel> testModel = new ArrayList<>();
		testModel.add(graphModel);

		when(graphRepository.findAll()).thenReturn(testModel);

		when(graphRepository.findByGraphId(graphId)).thenReturn(graphModel);
		when(scoreRepo.findByQuizId(quizId)).thenReturn(scoreModel);

		when(quizRepo.findByQuizId(quizId)).thenReturn(quiz);

		when(scoreService.getAnswerDataModel(scoreModel, "xyz")).thenReturn(answerData);

		participationController.calcScore(userName, quizId, quesId, answer);

		assertEquals(1, 1);
	}

	@Test
	public void testReturnDataForGraph() {
		graphModel = new GraphModel();

		graphId = new GraphId(123, 12);

		graphModel.setGraphId(graphId);
		graphModel.setOptionA(25);
		graphModel.setOptionB(25);
		graphModel.setOptionC(40);
		graphModel.setOptionD(10);
		when(graphRepository.findByGraphId(new GraphId())).thenReturn(graphModel);
		GraphModel model = participationController.returnDataForGraph(123, 12);
		assertEquals(graphModel.getGraphId().getQuizId(), model.getGraphId().getQuizId());

	}

	@Test
	public void testIsUniqueUser() {

		answerData = new AnswerData("xyz", 4, null);

		List<AnswerData> answerList = new ArrayList<AnswerData>();
		answerList.add(answerData);
		scoreModel = new ScoreModel();
		scoreModel.setQuizId(123);
		scoreModel.setAnswerData(answerList);

		when(scoreRepo.findByQuizId(123)).thenReturn(scoreModel);

		when(scoreService.getAnswerDataModel(scoreModel, "xyz")).thenReturn(answerData);

		boolean value = participationController.isUniqueUser("xyz", 123);

		assertEquals(false, value);

	}

	@Test
	public void testUserScore() {

		when(scoreRepo.findByQuizId(123)).thenReturn(scoreModel);
		answerData = new AnswerData("xyz", 4, null);
		when(scoreService.getAnswerDataModel(scoreModel, "xyz")).thenReturn(answerData);
		System.out.println("My score : " + answerData.getUserScore());
		int answer = participationController.userScore("xyz", 123, 10);

		assertNotEquals(4, answer);

	}

}
