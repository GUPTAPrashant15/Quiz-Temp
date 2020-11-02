package com.challenge1.backend.createQuiz.model;

import java.util.Date;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document(collection="CreateQuiz")
public class Quiz {
	
	@Transient
    public final static String SEQUENCE_NAME = "users_sequence";
	
	
	@Id
	private long quizId;
	
	
	private String quizName;
	private String description;
	private String username;
	
	@DateTimeFormat(iso=DateTimeFormat.ISO.DATE_TIME)
	private Date createdDate = new Date();
	
	private List<Questions> questions;
	
	public Quiz() {}
	
	
	
	
	public Quiz(String quizName, String description, String username, Date createdDate) {
		
		this.quizName = quizName;
		this.description = description;
		this.username = username;
		this.createdDate = createdDate;
	}


	

	public List<Questions> getQuestions() {
		return questions;
	}




	public void setQuestions(List<Questions> questions) {
		this.questions = questions;
	}




	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	
	public long getQuizId() {
		return quizId;
	}

	public void setQuizId(long quizId) {
		this.quizId = quizId;
	}

	public String getQuizName() {
		return quizName;
	}
	public void setQuizName(String quizName) {
		this.quizName = quizName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "Quiz [id=" + quizId + ", quizName=" + quizName + ", description=" + description + ", username=" + username
				+ ", createdDate=" + createdDate + "]";
	}

	
	
	
}

