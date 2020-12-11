package com.challenge1.backend.participationView.service;

import java.util.ArrayList;
import java.util.List;

import com.challenge1.backend.participationView.model.AnswerData;
import com.challenge1.backend.participationView.model.ScoreModel;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {


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
