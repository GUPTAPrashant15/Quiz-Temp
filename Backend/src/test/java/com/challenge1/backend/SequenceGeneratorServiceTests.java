package com.challenge1.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.challenge1.backend.createQuiz.model.Quiz;
import com.challenge1.backend.createQuiz.service.SequenceGeneratorService;

@SpringBootTest
public class SequenceGeneratorServiceTests {

	@Autowired
	private SequenceGeneratorService sequenceGenerator;

	@Test
	public void testGenerateService() {

		long id = 0;

		id = sequenceGenerator.generateSequence(Quiz.SEQUENCE_NAME);

		System.out.println(id);
		assertTrue(id > 0);

		long id2 = sequenceGenerator.generateSequence(Quiz.SEQUENCE_NAME);

		assertEquals(id + 1, id2);

	}
}
