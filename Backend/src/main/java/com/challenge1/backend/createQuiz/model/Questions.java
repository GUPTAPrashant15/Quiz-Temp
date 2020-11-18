package com.challenge1.backend.createQuiz.model;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;

//@Document(collection="CreateQuestions")
@Component
public class Questions {
	
	
	@Id
	private long quesId;
	
	private String question;
	private String quesType;
	private String option1;
	private String option2;
	private String option3;
	private String option4;
	private Integer correct;
	private boolean correct1;
	private boolean correct2;
	private boolean correct3;
	private boolean correct4;
	private String textAnswer;
	
	public Questions() {
		
	}
	
	public Questions(String question, String quesType, String option1, String option2, String option3, String option4,
			Integer correct, boolean correct1, boolean correct2, boolean correct3, boolean correct4,
			String textAnswer) {
		super();
		this.question = question;
		this.quesType = quesType;
		this.option1 = option1;
		this.option2 = option2;
		this.option3 = option3;
		this.option4 = option4;
		this.correct = correct;
		this.correct1 = correct1;
		this.correct2 = correct2;
		this.correct3 = correct3;
		this.correct4 = correct4;
		this.textAnswer = textAnswer;
	}

	public long getQuesId() {
		return quesId;
	}

	public void setQuesId(long id) {
		this.quesId = id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getQuesType() {
		return quesType;
	}

	public void setQuesType(String quesType) {
		this.quesType = quesType;
	}

	public String getOption1() {
		return option1;
	}

	public void setOption1(String option1) {
		this.option1 = option1;
	}

	public String getOption2() {
		return option2;
	}

	public void setOption2(String option2) {
		this.option2 = option2;
	}

	public String getOption3() {
		return option3;
	}

	public void setOption3(String option3) {
		this.option3 = option3;
	}

	public String getOption4() {
		return option4;
	}

	public void setOption4(String option4) {
		this.option4 = option4;
	}

	public Integer getCorrect() {
		return correct;
	}

	public void setCorrect(Integer correct) {
		this.correct = correct;
	}

	public boolean isCorrect1() {
		return correct1;
	}

	public void setCorrect1(boolean correct1) {
		this.correct1 = correct1;
	}

	public boolean isCorrect2() {
		return correct2;
	}

	public void setCorrect2(boolean correct2) {
		this.correct2 = correct2;
	}

	public boolean isCorrect3() {
		return correct3;
	}

	public void setCorrect3(boolean correct3) {
		this.correct3 = correct3;
	}

	public boolean isCorrect4() {
		return correct4;
	}

	public void setCorrect4(boolean correct4) {
		this.correct4 = correct4;
	}

	public String getTextAnswer() {
		return textAnswer;
	}

	public void setTextAnswer(String textAnswer) {
		this.textAnswer = textAnswer;
	}

	@Override
	public String toString() {
		return "Questions [id=" + quesId + ", question=" + question + ", quesType=" + quesType + ", option1=" + option1
				+ ", option2=" + option2 + ", option3=" + option3 + ", option4=" + option4 + ", correct=" + correct
				+ ", correct1=" + correct1 + ", correct2=" + correct2 + ", correct3=" + correct3 + ", correct4="
				+ correct4 + ", textAnswer=" + textAnswer + "]";
	}
	
	
}
