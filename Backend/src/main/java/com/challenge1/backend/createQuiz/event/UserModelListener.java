package com.challenge1.backend.createQuiz.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import com.challenge1.backend.createQuiz.model.Quiz;
import com.challenge1.backend.createQuiz.service.SequenceGeneratorService;



@Component
public class UserModelListener extends AbstractMongoEventListener<Quiz> {

    private SequenceGeneratorService sequenceGenerator;

    @Autowired
    public UserModelListener(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Quiz> event) {
        if (event.getSource().getQuizId() < 1) {
            event.getSource().setQuizId(sequenceGenerator.generateSequence(Quiz.SEQUENCE_NAME));
        }
    }


}
