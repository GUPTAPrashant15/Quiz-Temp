package com.challenge1.backend.participationView.model;

import org.springframework.data.annotation.Id;

public class GraphModel {

    // @Id
    // private long quizId;

    // private long quesId;

    @Id
    private GraphId graphId;

    private long optionA;
    private long optionB;
    private long optionC;
    private long optionD;

    public GraphModel() {
    }

    // public GraphModel(long quizId, long quesId, long optionA, long optionB, long optionC, long optionD) {
    //     this.quizId = quizId;
    //     this.quesId = quesId;
    //     this.optionA = optionA;
    //     this.optionB = optionB;
    //     this.optionC = optionC;
    //     this.optionD = optionD;
    // }

    public GraphModel(GraphId graphId, long optionA, long optionB, long optionC, long optionD) {
        this.graphId = graphId;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
    }


    // public long getQuizId() {
    //     return quizId;
    // }

    // public void setQuizId(long quizId) {
    //     this.quizId = quizId;
    // }

    // public long getQuesId() {
    //     return quesId;
    // }

    // public void setQuesId(long quesId) {
    //     this.quesId = quesId;
    // }

    public GraphId getGraphId() {
        return graphId;
    }

    public void setGraphId(GraphId graphId) {
        this.graphId = graphId;
    }

    public long getOptionA() {
        return optionA;
    }

    public void setOptionA(long optionA) {
        this.optionA = optionA;
    }

    public long getOptionB() {
        return optionB;
    }

    public void setOptionB(long optionB) {
        this.optionB = optionB;
    }

    public long getOptionC() {
        return optionC;
    }

    public void setOptionC(long optionC) {
        this.optionC = optionC;
    }

    public long getOptionD() {
        return optionD;
    }

    public void setOptionD(long optionD) {
        this.optionD = optionD;
    }

    @Override
    public String toString() {
        return "GraphModel [graphId=" + graphId + ", optionA=" + optionA + ", optionB=" + optionB + ", optionC="
                + optionC + ", optionD=" + optionD + "]";
    }

    // @Override
    // public String toString() {
    //     return "GraphModel [optionA=" + optionA + ", optionB=" + optionB + ", optionC=" + optionC + ", optionD="
    //             + optionD + ", quesId=" + quesId + ", quizId=" + quizId + "]";
    // }

}
