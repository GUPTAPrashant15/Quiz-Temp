package com.challenge1.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.challenge1.backend.createQuiz.model.Questions;
import com.challenge1.backend.createQuiz.model.Quiz;

@SpringBootTest
public class CreateQuizModelTests {

	@Test
	public void testQuestionsModel() {

		Questions q1 = new Questions("what", "single correct", "op1", "op2", "op3", "op4", 2, false, false, false,
				false, null);
		// Questions q2 = new Questions("why", "multiple correct", "op1", "op2", "op3",
		// "op4",
		// 0, true, true, false, false,
		// null);

		q1.setQuesId(1L);
		// q2.setQuesId(2L);

		List<Questions> questions = new ArrayList<Questions>();
		questions.add(q1);
		// questions.add(q2);

		assertEquals("[Questions [id=" + 1 + ", question=" + "what" + ", quesType=" + "single correct" + ", option1="
				+ "op1" + ", option2=" + "op2" + ", option3=" + "op3" + ", option4=" + "op4" + ", correct=" + 2
				+ ", correct1=" + false + ", correct2=" + false + ", correct3=" + false + ", correct4=" + false
				+ ", textAnswer=" + null + "]]", questions.toString());

	}

	@Test
	public void testQuizModel() {

		Date createdDate = new Date();

		Quiz mockQuiz = new Quiz( "Angular", "MCQ", true, "sweety", createdDate);
		mockQuiz.setQuizId(11l);

		assertEquals("Quiz [createdDate=" + createdDate + ", description=" + "MCQ" + ", isLiveStatus=" + true
		+ ", questions=" + null + ", quizId=" + 11 + ", quizName=" + "Angular" + ", username="
		+ "sweety" + "]", mockQuiz.toString());

	}

}
