package com.challenge1.backend.participationView.model;

public class GraphId {

    private long quizId;
    private long questId;

    public GraphId() {
    }

    public GraphId(long quizId, long questId) {
        this.quizId = quizId;
        this.questId = questId;
    }

    public long getQuizId() {
        return quizId;
    }

    public void setQuizId(long quizId) {
        this.quizId = quizId;
    }

    public long getQuestId() {
        return questId;
    }

    public void setQuestId(long questId) {
        this.questId = questId;
    }

    @Override
    public String toString() {
        return "GraphId [questId=" + questId + ", quizId=" + quizId + "]";
    }

}
