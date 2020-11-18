package com.challenge1.backend.participationView.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Quiz-Session")
public class QuizSession {

    @Id
    private long quizId;

    private long noOfUsers;

    public QuizSession() {
    }

    public QuizSession(long quizId, long noOfUsers) {
        this.quizId = quizId;
        this.noOfUsers = noOfUsers;
    }

    public long getQuizId() {
        return quizId;
    }

    public void setQuizId(long quizId) {
        this.quizId = quizId;
    }

    public long getNoOfUsers() {
        return noOfUsers;
    }

    public void setNoOfUsers(long noOfUsers) {
        this.noOfUsers = noOfUsers;
    }

    @Override
    public String toString() {
        return "QuizSession [noOfUsers=" + noOfUsers + ", quizId=" + quizId + "]";
    }

}
