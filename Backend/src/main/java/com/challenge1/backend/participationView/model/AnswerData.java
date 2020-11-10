package com.challenge1.backend.participationView.model;

public class AnswerData {

    private String userName;
    private Integer userScore;

    public AnswerData() {
    }

    public AnswerData(String userName, Integer userScore) {

        this.userName = userName;
        this.userScore = userScore;
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

    @Override
    public String toString() {
        return "AnswerData [userName=" + userName + ", userScore=" + userScore + "]";
    }

}
