package com.challenge1.backend.participationView.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User-Answers")
public class ScoreModel {

    @Id
    private long quizId;
    private List<AnswerData> answerData;

    public ScoreModel() {
    }

    public ScoreModel(long quizId, List<AnswerData> answerData) {
        this.quizId = quizId;
        this.answerData = answerData;
    }

    public long getQuizId() {
        return quizId;
    }

    public void setQuizId(long quizId) {
        this.quizId = quizId;
    }

    public List<AnswerData> getAnswerData() {
        return answerData;
    }

    public void setAnswerData(List<AnswerData> answerData) {
        this.answerData = answerData;
    }

    @Override
    public String toString() {
        return "ScoreModel [answerData=" + answerData + ", quizId=" + quizId + "]";
    }

}
