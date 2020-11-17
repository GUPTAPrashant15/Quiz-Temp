package com.challenge1.backend.participationView.service;

import java.util.List;

import com.challenge1.backend.participationView.model.AnswerData;
import com.challenge1.backend.participationView.model.ScoreModel;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {
    private MongoOperations mongoOperation;

    public ScoreService() {
    }

    @Autowired
    public ScoreService(MongoOperations mongoOperations) {
        this.mongoOperation = mongoOperations;
    }

    public void updateUserScore(long id, String userName, int score) {

        mongoOperation.findAndModify(
                new Query(Criteria.where("_id").is(id).andOperator(Criteria.where("answerData.userName").is(userName))),
                new Update().set("answerData.userScore", score), ScoreModel.class);
    }


    public AnswerData getAnswerDataModel(ScoreModel quizData, String userName) {
        if (quizData != null) {
            List<AnswerData> usersData = quizData.getAnswerData();
            if (usersData != null) {
                for (AnswerData answer : usersData) {
                    if (userName.equalsIgnoreCase(answer.getUserName()))
                        return answer;
                }
            }
        }
        return null;
    }
}
