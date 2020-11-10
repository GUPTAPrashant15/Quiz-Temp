package com.challenge1.backend.participationView.controller;

import java.util.List;
import java.util.Optional;

import com.challenge1.backend.createQuiz.model.Questions;
import com.challenge1.backend.createQuiz.model.Quiz;
import com.challenge1.backend.createQuiz.repository.QuizRepository;
import com.challenge1.backend.participationView.model.GraphId;
import com.challenge1.backend.participationView.model.GraphModel;
import com.challenge1.backend.participationView.model.ScoreModel;
import com.challenge1.backend.participationView.repository.GraphRepository;
import com.challenge1.backend.participationView.repository.ScoreRepository;

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

    @Autowired
    private QuizRepository quizRepo;
    @Autowired
    private GraphRepository graphRepo;
    @Autowired
    private ScoreRepository scoreRepo;

    @GetMapping("/hello-part")
    public String helloPart() {

        System.out.println("Testing Participation Controller...");
        return "Hello Participation Controller!";

    }

    @PostMapping("/quiz-view/{quizId}")
    public Optional<Quiz> quizView(@PathVariable(value = "quizId") long quizId) {

        Optional<Quiz> quiz = quizRepo.findById(quizId);

        return quiz;

    }

    @PutMapping("/quiz-score/{userName}/{quizId}/{quesId}/{answer}")
    public ScoreModel calcScore(
        @PathVariable(value = "userName") String userName,
        @PathVariable(value = "quizId") long quizId,
        @PathVariable(value = "quesId") long quesId,
        @PathVariable(value = "answer") String answer) {

        GraphModel graph = new GraphModel();
        GraphModel existingGraph = null;

        GraphId graphId = new GraphId(quizId, quesId);
        existingGraph = graphRepo.findByGraphId(graphId);

        if (existingGraph == null) {
            graph.setGraphId(graphId);
            graph.setOptionA(0);
            graph.setOptionB(0);
            graph.setOptionC(0);
            graph.setOptionD(0);
            graphRepo.save(graph);
        }

        existingGraph = graphRepo.findByGraphId(graphId);

        System.out.println(existingGraph);

        ScoreModel score = scoreRepo.findByUserName(userName);
        Integer answerScore = 0;

        Quiz quiz = quizRepo.findByQuizId(quizId);

        List<Questions> questions = null;
        if (quiz != null) questions = quiz.getQuestions();

        for (Questions question : questions) {

            if (question.getQuesId() == quesId) {

                if (question.getQuesType().equals("Single Correct")) {

                    if ((answer.charAt(0) - 64) == question.getCorrect())
                        answerScore += 1;
                    if (answer.charAt(0) == 'A')
                        existingGraph.setOptionA(existingGraph.getOptionA() + 1);
                    if (answer.charAt(0) == 'B')
                        existingGraph.setOptionB(existingGraph.getOptionB() + 1);
                    if (answer.charAt(0) == 'C')
                        existingGraph.setOptionC(existingGraph.getOptionC() + 1);
                    if (answer.charAt(0) == 'D')
                        existingGraph.setOptionD(existingGraph.getOptionD() + 1);

                }

                else if (question.getQuesType().equals("Multiple Correct")) {

                    // boolean isAnswerCorrect = true;
                    int flag=0 , flag1=0;

                    if(question.isCorrect1())
                        flag++;
                    if(question.isCorrect2())
                        flag++;
                    if(question.isCorrect3())
                        flag++;
                    if(question.isCorrect4())
                        flag++;

                    if(answer.contains("A") && question.isCorrect1())
                        flag1++;
                    else flag1--;
                    if(answer.contains("B") && question.isCorrect2())
                        flag1++;
                    else flag1--;
                    if(answer.contains("C") && question.isCorrect3())
                        flag1++;
                    else flag1--;
                    if(answer.contains("D") && question.isCorrect4())
                        flag1++;
                    else flag1--;

                    if (answer.contains("A"))
                        existingGraph.setOptionA(existingGraph.getOptionA() + 1);
                    if (answer.contains("B"))
                        existingGraph.setOptionB(existingGraph.getOptionB() + 1);
                    if (answer.contains("C"))
                        existingGraph.setOptionC(existingGraph.getOptionC() + 1);
                    if (answer.contains("D"))
                        existingGraph.setOptionD(existingGraph.getOptionD() + 1);

                    if (flag == flag1) answerScore += 1;

                }

                else if (question.getQuesType().equals("Textual")) {

                    if (answer.equalsIgnoreCase(question.getTextAnswer()))
                        answerScore += 1;

                }

            }

        }

        if (score == null) {

            ScoreModel s = new ScoreModel();
            s.setUserName(userName);
            s.setQuizId(quizId);
            s.setUserScore(answerScore);
            scoreRepo.save(s);

        } else {

            score.setUserScore(score.getUserScore() + answerScore);
            scoreRepo.save(score);

        }

        graphRepo.save(existingGraph);

        return score;

    }

    @PostMapping(value = "/getGraphDataForQuesVsScore/{quizId}/{quesId}")
    public GraphModel returnDataForGraph(
        @PathVariable(value = "quizId") long quizId,
        @PathVariable(value = "quesId") long quesId) {

        GraphModel graph = graphRepo.findByGraphId(new GraphId(quizId, quesId));
        return graph;

    }

    @PostMapping(value="/verifyUsername/{userName}")
    public boolean isUniqueUser(@PathVariable(value = "userName") String userName ) {

        ScoreModel verifyUser = scoreRepo.findByUserName(userName);

        if (verifyUser == null) return true;

        return false;
    }

    @GetMapping(value="/getUserScore/{userName}")
    public int userScore(@PathVariable(value = "userName") String userName ) {

        ScoreModel user = scoreRepo.findByUserName(userName);

        if (user != null) return user.getUserScore();

       return 0;
    }

}