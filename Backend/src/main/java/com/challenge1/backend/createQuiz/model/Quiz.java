package com.challenge1.backend.createQuiz.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document(collection = "CreateQuiz")
public class Quiz {

	@Transient
	public final static String SEQUENCE_NAME = "users_sequence";

	@Id
	private long quizId;

	private String quizName;
	private String description;
	private boolean isLiveStatus = true;
	private String username;
	private int quizTime;
	
	@DateTimeFormat(iso=DateTimeFormat.ISO.DATE_TIME)
	private Date startDate;
	
	@DateTimeFormat(iso=DateTimeFormat.ISO.DATE_TIME)
	private Date endDate;

	// @DateTimeFormat(iso=DateTimeFormat.ISO.DATE_TIME)
	// private Date createdDate = new Date();

	private LocalDate createdDate = LocalDate.now();

	private List<Questions> questions;

	public Quiz() {
	}

//	public Quiz(long quizId, String quizName, String description, boolean isLiveStatus, String username,
//			LocalDate createdDate, int time) {
//
//		this.quizId = quizId;
//		this.quizName = quizName;
//		this.description = description;
//		this.isLiveStatus = isLiveStatus;
//		this.username = username;
//		this.createdDate = createdDate;
//		this.time = time;
//	}


	public Quiz(long quizId, String quizName, String description, boolean isLiveStatus, String username, int quizTime,
		Date startDate, Date endDate, LocalDate createdDate) {
	
		this.quizId = quizId;
		this.quizName = quizName;
		this.description = description;
		this.isLiveStatus = isLiveStatus;
		this.username = username;
		this.quizTime = quizTime;
		this.startDate = startDate;
		this.endDate = endDate;
		this.createdDate = createdDate;
	}
	
	public List<Questions> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Questions> questions) {
		this.questions = questions;
	}

	public LocalDate getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDate createdDate) {
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

	public boolean getIsLiveStatus() {
		return isLiveStatus;
	}

	public void setIsLiveStatus(boolean isLiveStatus) {
		this.isLiveStatus = isLiveStatus;
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

	public boolean isLiveStatus() {
		return isLiveStatus;
	}

	public void setLiveStatus(boolean isLiveStatus) {
		this.isLiveStatus = isLiveStatus;
	}

	public int getQuizTime() {
		return quizTime;
	}

	public void setQuizTime(int quizTime) {
		this.quizTime = quizTime;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Override
	public String toString() {
		return "Quiz [quizId=" + quizId + ", quizName=" + quizName + ", description=" + description + ", isLiveStatus="
				+ isLiveStatus + ", username=" + username + ", quizTime=" + quizTime + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", createdDate=" + createdDate + ", questions=" + questions + "]";
	}
	
	
//
//	@Override
//	public String toString() {
//		return "Quiz [createdDate=" + createdDate + ", description=" + description + ", isLiveStatus=" + isLiveStatus
//				+ ", questions=" + questions + ", quizId=" + quizId + ", quizName=" + quizName + ", time=" + time
//				+ ", username=" + username + "]";
//	}

//	public int getTime() {
//		return time;
//	}
//
//	public void setTime(int time) {
//		this.time = time;
//	}

}
