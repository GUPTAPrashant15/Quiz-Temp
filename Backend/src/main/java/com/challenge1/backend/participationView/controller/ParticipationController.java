package com.challenge1.backend.participationView.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.challenge1.backend.createQuiz.model.Questions;
import com.challenge1.backend.createQuiz.model.Quiz;
import com.challenge1.backend.createQuiz.repository.QuizRepository;
import com.challenge1.backend.participationView.model.AnswerData;
import com.challenge1.backend.participationView.model.GraphId;
import com.challenge1.backend.participationView.model.GraphModel;
import com.challenge1.backend.participationView.model.ScoreModel;
import com.challenge1.backend.participationView.repository.GraphRepository;
import com.challenge1.backend.participationView.repository.ScoreRepository;
import com.challenge1.backend.participationView.service.ScoreService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/participation-view")
public class ParticipationController {

	private static final Logger logger = LoggerFactory.getLogger(ParticipationController.class);

	@Autowired
	private QuizRepository quizRepo;
	@Autowired
	private GraphRepository graphRepo;
	@Autowired
	private ScoreRepository scoreRepo;
	private LocalDate localDate = LocalDate.now();
	ScoreService scoreService = new ScoreService();

	@PostMapping("/quiz-view/{quizId}")
	public Optional<Quiz> quizView(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Quiz View API -----");

		Optional<Quiz> quiz = quizRepo.findById(quizId);
		ScoreModel existingQuiz = scoreRepo.findByQuizId(quizId);
		if(existingQuiz == null){
			ScoreModel score = new ScoreModel();
			score.setQuizId(quizId);
			scoreRepo.save(score);
		}
		return quiz;
	}

	@PutMapping("/quiz-score/{userName}/{quizId}/{quesId}/{answer}")
	public ScoreModel calcScore(
		@PathVariable(value = "userName") String userName,
		@PathVariable(value = "quizId") long quizId,
		@PathVariable(value = "quesId") long quesId,
		@PathVariable(value = "answer") String answer) {

		logger.info("----- Inside Calculate Score API -----");

		GraphModel graph = new GraphModel();
		GraphModel existingGraph = null;

		GraphId graphId = new GraphId(quizId, quesId);
		existingGraph = graphRepo.findByGraphId(graphId);

		if (existingGraph == null) {

			logger.info("No existing Graph Model is found in the System");

			graph.setGraphId(graphId);

			graph.setOptionA(0);
			graph.setOptionB(0);
			graph.setOptionC(0);
			graph.setOptionD(0);

			graphRepo.save(graph);

			logger.info("New Graph Model is created with Quiz ID " + graphId + " and saved in the System");

		}

		existingGraph = graphRepo.findByGraphId(graphId);
		//Only for testing
		if(existingGraph == null)
			existingGraph = getDummyDataForTesting();			

		Integer answerScore = 0;

		Quiz quiz = quizRepo.findByQuizId(quizId);

		List<Questions> questions = null;
		if (quiz != null) questions = quiz.getQuestions();

		for (Questions question : questions) {

			if (question.getQuesId() == quesId) {

				if (question.getQuesType().equals("Single Correct")) {

					logger.info("Question is of Single Correct category");

					if ((answer.charAt(0) - 64) == question.getCorrect())
						answerScore += 1;

					existingGraph = increaseAnswerCounter(answer, existingGraph);

				} else if (question.getQuesType().equals("Multiple Correct")) {

					logger.info("Question is of Multiple Correct category");

					if (isMultiOptionsAnswerCorrect(question, answer))
						answerScore += 1;

					existingGraph = increaseAnswerCounter(answer, existingGraph);

				} else if (question.getQuesType().equals("Textual")) {

					logger.info("Question is of Textual category");

					if (answer.equalsIgnoreCase(question.getTextAnswer()))
						answerScore += 1;
				}
			}

		}

		ScoreModel existingScore = scoreRepo.findByQuizId(quizId);

		AnswerData userAnsData = scoreService.getAnswerDataModel(existingScore, userName);
		userAnsData.setUserScore(userAnsData.getUserScore() + answerScore);
		logger.info("Answer Data in the Answer Data Lists are updated");
		scoreRepo.save(existingScore);
		graphRepo.save(existingGraph);
		logger.info("Graph Model is saved in the System");
		return existingScore;

	}
	//For testing purpose
	private GraphModel getDummyDataForTesting() {
		GraphModel graphModel=new GraphModel();
        graphModel.setGraphId(new GraphId(123, 12));
        graphModel.setOptionA(25);
        graphModel.setOptionB(25);
        graphModel.setOptionC(40);
        graphModel.setOptionD(10);
		return graphModel;
	}

	@PostMapping(value = "/getGraphDataForQuesVsScore/{quizId}/{quesId}")
	public GraphModel returnDataForGraph(
		@PathVariable(value = "quizId") long quizId,
		@PathVariable(value = "quesId") long quesId) {

		logger.info("----- Inside Send Graph Data for Visualization API -----");

		GraphModel graph = graphRepo.findByGraphId(new GraphId(quizId, quesId));
		//Only for testing
		if(graph == null)
			graph = getDummyDataForTesting();	
		return graph;

	}

	@PostMapping(value = "/verifyUsername/{userName}/{quizId}")
	public boolean isUniqueUser(
		@PathVariable(value = "userName") String userName,
		@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Check Unique User API -----");

		ScoreModel quizData = scoreRepo.findByQuizId(quizId);
		AnswerData user = scoreService.getAnswerDataModel(quizData, userName);

		if (user == null){ 
			List<AnswerData> answerDatas = quizData.getAnswerData();
			if(answerDatas == null){
				List<AnswerData> newAnswerDatasList = new ArrayList<AnswerData>();
				newAnswerDatasList.add(new AnswerData(userName, 0, localDate));
				quizData.setAnswerData(newAnswerDatasList);	
			}
			else{
				answerDatas.add(new AnswerData(userName, 0, localDate));
				quizData.setAnswerData(answerDatas);
			}
			scoreRepo.save(quizData);
			return true;
		}
		
		return false;

	}

	@GetMapping(value = "/realtimeanalysis/{quizId}")
	public ScoreModel getResultById(@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Get Result API -----");

		ScoreModel quiz = scoreRepo.findByQuizId(quizId);

		System.out.println("From inside getResultById() Function : " + quiz.getAnswerData());

		return quiz;

	}

	@GetMapping(value = "/getUserScore/{userName}/{quizId}")
	public int userScore(
		@PathVariable(value = "userName") String userName,
		@PathVariable(value = "quizId") long quizId) {

		logger.info("----- Inside Get User Score API -----");

		ScoreModel quizData = scoreRepo.findByQuizId(quizId);
		AnswerData user = scoreService.getAnswerDataModel(quizData, userName);

		if (user != null) return user.getUserScore();
		
		return 0;

	}

	public GraphModel increaseAnswerCounter(String answer, GraphModel existingGraph) {

		logger.info("----- Inside Answer Counter Function -----");

		if (answer.charAt(0) == 'A')
			existingGraph.setOptionA(existingGraph.getOptionA() + 1);
		if (answer.charAt(0) == 'B')
			existingGraph.setOptionB(existingGraph.getOptionB() + 1);
		if (answer.charAt(0) == 'C')
			existingGraph.setOptionC(existingGraph.getOptionC() + 1);
		if (answer.charAt(0) == 'D')
			existingGraph.setOptionD(existingGraph.getOptionD() + 1);

		return existingGraph;

	}

	public boolean isMultiOptionsAnswerCorrect(Questions question, String answer) {

		logger.info("----- Inside Multiple Answers Check Function -----");

		int correctFlag = 0, userFlag = 0;

		if (question.isCorrect1()) correctFlag++;
		if (question.isCorrect2()) correctFlag++;
		if (question.isCorrect3()) correctFlag++;
		if (question.isCorrect4()) correctFlag++;

		if (answer.contains("A")) {
			if (question.isCorrect1()) userFlag++;
			else userFlag--;
		}

		if (answer.contains("B")) {
			if (question.isCorrect2()) userFlag++;
			else userFlag--;
		}

		if (answer.contains("C")) {
			if (question.isCorrect3()) userFlag++;
			else userFlag--;
		}

		if (answer.contains("D")) {
			if (question.isCorrect4()) userFlag++;
			else userFlag--;
		}

		if (correctFlag == userFlag) return true;

		return false;

	}

}
