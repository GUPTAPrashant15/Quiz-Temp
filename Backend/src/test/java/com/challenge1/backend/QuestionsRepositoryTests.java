package com.challenge1.backend;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.challenge1.backend.createQuiz.model.Questions;
import com.challenge1.backend.createQuiz.model.Quiz;
import com.challenge1.backend.createQuiz.repository.QuestionsRepository;
import com.challenge1.backend.createQuiz.repository.QuizRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class QuestionsRepositoryTests {

	@Autowired
	public QuestionsRepository quesRepo;

	@Autowired
	public QuizRepository quizRepo;

	@Test
	public void testagain() {
		
		Date startDate = new Date();
		Date endDate = new Date();

		Quiz mockQuiz = new Quiz(11l, "Angular", "MCQ", true, "sweety",5,startDate,endDate, LocalDate.now());

		quizRepo.save(mockQuiz);

		Questions q1 = new Questions("what", "single correct", "op1", "op2", "op3", "op4", 2, false, false, false,
				false, null);
		Questions q2 = new Questions("why", "multiple correct", "op1", "op2", "op3", "op4", 0, true, true, false, false,
				null);

		q1.setQuesId(1L);
		q2.setQuesId(2L);

		List<Questions> questions = new ArrayList<Questions>();

		questions.add(q1);
		questions.add(q2);

		quesRepo.updateQuiz(11, questions);

		Quiz quiz = quizRepo.findById((long) 11).get();

		assertThat(quiz).isNotNull();
		assertThat(quiz.getQuestions()).size().isEqualTo(2);

	}

}
