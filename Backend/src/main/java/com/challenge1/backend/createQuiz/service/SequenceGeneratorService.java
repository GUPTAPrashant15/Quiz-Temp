package com.challenge1.backend.createQuiz.service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.challenge1.backend.createQuiz.model.DatabaseSequence;

/**
 * This is a Sequence Generator service that'll generate the auto-incremented value that can 
 * be used as id for our Quiz entities.
 *
 */

@Service
public class SequenceGeneratorService {
	
	private MongoOperations mongoOperations;

    @Autowired
    public SequenceGeneratorService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }
/**
 * This generateSequence method is used to generate a unique id for the Quiz.
 * 
 * @param seqName database Sequence name.
 * @return quizId This a unique id that is generated.
 */
    public long generateSequence(String seqName) {

        DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;

    }
   
}
