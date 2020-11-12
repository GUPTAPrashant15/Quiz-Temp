package com.challenge1.backend.participationView.model;

import java.time.LocalDate;


public class AnswerData {

    private String userName;
    private Integer userScore;
    private LocalDate localDate;

    public AnswerData() {
    }

    public AnswerData(String userName, Integer userScore,LocalDate localDate) {

        this.userName = userName;
        this.userScore = userScore;
        this.localDate = localDate;
    }

    public Integer getUserScore() {
        return userScore;
    }

    public void setUserScore(Integer userScore) {
        this.userScore = userScore;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDate getLocalDate() {
        return localDate;
    }

    public void setLocalDate(LocalDate localDate) {
        this.localDate = localDate;
    }

    @Override
    public String toString() {
        return "AnswerData [localDate=" + localDate + ", userName=" + userName + ", userScore=" + userScore + "]";
    }

}
