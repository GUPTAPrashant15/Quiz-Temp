package com.challenge1.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import static org.mockito.Mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.challenge1.backend.createQuiz.controller.CreateQuizController;
import com.challenge1.backend.createQuiz.model.Questions;
import com.challenge1.backend.createQuiz.model.Quiz;
import com.challenge1.backend.createQuiz.repository.QuestionsRepository;
import com.challenge1.backend.createQuiz.repository.QuizRepository;
import com.challenge1.backend.createQuiz.service.SequenceGeneratorService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class CreateQuizControllerTests {

	@InjectMocks
	private CreateQuizController createQuizController;

	@Mock
	private QuizRepository quizRepository;

	@Mock
	private QuestionsRepository quesRepo;

	private MockMvc mockMvc;

	@Autowired
	private QuizRepository quizRepo;

	@Autowired
	private MongoOperations mongoOps;

	@Mock
	SequenceGeneratorService sequenceGenerator;

	@Test
	public void testDemoQuizAdd() throws Exception {

		mockMvc = MockMvcBuilders.standaloneSetup(createQuizController).build();

		mockMvc.perform(MockMvcRequestBuilders.get("/")).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string("Demo Quiz Addition"));

	}

	@Test
	public void testCreateQuiz() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(createQuizController).build();

		Quiz mockQuiz = new Quiz(11l, "Angular", "MCQ", true, "sweety", LocalDate.now());
		mockQuiz.setQuizId(11l);

		when(sequenceGenerator.generateSequence(anyString())).thenReturn(11l);

		Mockito.when(quizRepository.save(mockQuiz)).thenReturn(mockQuiz);

		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/addQuiz")
				.accept(MediaType.APPLICATION_JSON).content(mapToJson(mockQuiz))
				.contentType(MediaType.APPLICATION_JSON);
		ResultActions result = mockMvc.perform(request);
		result.andExpect(MockMvcResultMatchers.status().isOk());

	}

	@Test
	public void testAddQuestions() throws Exception {

		mockMvc = MockMvcBuilders.standaloneSetup(createQuizController).build();

		Questions q1 = new Questions("what", "single correct", "op1", "op2", "op3", "op4", 2, false, false, false,
				false, null);
		Questions q2 = new Questions("why", "multiple correct", "op1", "op2", "op3", "op4", 0, true, true, false, false,
				null);
		List<Questions> questions = new ArrayList<Questions>();
		questions.add(q1);
		questions.add(q2);

		Optional<Quiz> mockQuiz = Optional.ofNullable(new Quiz(11l, "Angular", "MCQ", true, "sweety", LocalDate.now()));

		Mockito.when(quizRepository.findById(11l)).thenReturn(mockQuiz);

		assertEquals(true, mockQuiz.isPresent());

		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/addQuestions/11")
				.accept(MediaType.APPLICATION_JSON).content(mapToJson(questions))
				.contentType(MediaType.APPLICATION_JSON);
		ResultActions result = mockMvc.perform(request);
		result.andExpect(MockMvcResultMatchers.status().isOk());

		q1.setQuesId(1L);
		q2.setQuesId(2l);

		verify(quesRepo, times(1)).updateQuiz(anyLong(), any());

	}

	@Test
	void createQuiz() {

		LocalDate createDate = LocalDate.now();
		Quiz insertQuiz = new Quiz(11l, "Angular", "MCQ",true, "sweety", createDate);

		Quiz insertedQuiz = quizRepo.save(insertQuiz);

		assertEquals(11, insertedQuiz.getQuizId());
		assertEquals("Angular", insertedQuiz.getQuizName());
		assertEquals("MCQ", insertedQuiz.getDescription());
		assertEquals("sweety", insertedQuiz.getUsername());
		assertEquals(createDate, insertedQuiz.getCreatedDate());

		assertEquals("Angular", mongoOps.findById(11, Quiz.class).getQuizName());
		assertEquals("MCQ", mongoOps.findById(11, Quiz.class).getDescription());
		assertEquals("sweety", mongoOps.findById(11, Quiz.class).getUsername());

	}

	private String mapToJson(Object object) throws JsonProcessingException {

		ObjectMapper objectMapper = new ObjectMapper();
		System.out.println(objectMapper.writeValueAsString(object));
		return objectMapper.writeValueAsString(object);
	}

	@Test
	public void getQuizTest() throws JsonProcessingException, Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(createQuizController).build();
		mockMvc.perform(MockMvcRequestBuilders.get("/list/rinkuyadav")).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().string("[]"));
	}

	@Test
	public void getQuizTest1() {

		LocalDate createDate = LocalDate.now();

		Quiz insertQuiz = new Quiz(11l, "Angular", "MCQ", true, "rinku", createDate);
		Quiz insertQuiz1 = new Quiz(12l, "React", "MCQ",true, "rinku", createDate);

		Quiz quiz1 = quizRepo.save(insertQuiz);
		Quiz quiz2 = quizRepo.save(insertQuiz1);

		assertThat(quizRepo.findByUsernameOrderByQuizIdDesc("rinku")).isNotNull();

		ArrayList<Quiz> quizzes = new ArrayList<>();

		quizzes.add(quiz1);
		quizzes.add(quiz2);

		assertThat(quizRepo.findByUsernameOrderByQuizIdDesc("rinku")).size().isEqualTo(2);

	}

	@Test
	public void testgetQuizById() throws JsonProcessingException, Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(createQuizController).build();

		Optional<Quiz> mockQuiz = Optional.ofNullable(new Quiz(11l, "Angular", "MCQ", true, "sweety", LocalDate.now()));

		Mockito.when(quizRepository.findById(11l)).thenReturn(mockQuiz);

		mockMvc.perform(MockMvcRequestBuilders.get("/realtimeanalysis/11"))
				.andExpect(MockMvcResultMatchers.status().isOk());

	}

}
