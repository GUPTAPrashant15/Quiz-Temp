package com.challenge1.backend.participationView.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User-Answers")
public class ScoreModel {

    @Id
    private String userName;

    private long quizId;
    private Integer userScore;

    public ScoreModel() {
    }

    public ScoreModel(String userName, long quizId, Integer userScore) {
        this.userName = userName;
        this.quizId = quizId;
        this.userScore = userScore;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public long getQuizId() {
        return quizId;
    }

    public void setQuizId(long quizId) {
        this.quizId = quizId;
    }

    public Integer getUserScore() {
        return userScore;
    }

    public void setUserScore(Integer userScore) {
        this.userScore = userScore;
    }

    @Override
    public String toString() {
        return "AnswerModel [quizId=" + quizId + ", userName=" + userName + ", userScore=" + userScore + "]";
    }

}
