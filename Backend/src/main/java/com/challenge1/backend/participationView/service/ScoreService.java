package com.challenge1.backend.participationView.service;

import java.util.ArrayList;
import java.util.List;

import com.challenge1.backend.participationView.model.AnswerData;
import com.challenge1.backend.participationView.model.ScoreModel;
import com.challenge1.backend.participationView.repository.ScoreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepo;
    private MongoOperations mongoOperations;
    public ScoreService(){
        
    }

    @Autowired
    public ScoreService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
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

    public ScoreModel getParticipants(ScoreModel quiz) {
        
       // return mongoOperations.find(query(where("quizId").is(quizId).andOperator(where("isCompleted").is("true"))), ScoreModel.class);
       
       ScoreModel tempScoreModel = new ScoreModel();
       List<AnswerData> listUsers = quiz.getAnswerData();
       List<AnswerData> tempList = new ArrayList<>();
       for (AnswerData answerData : listUsers) {
           
           if(answerData.isCompleted())
                tempList.add(answerData);
           
       }
       tempScoreModel.setQuizId(quiz.getQuizId());
       tempScoreModel.setAnswerData(tempList);
       return tempScoreModel;
    }
}
