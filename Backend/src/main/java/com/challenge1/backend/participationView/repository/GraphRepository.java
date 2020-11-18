package com.challenge1.backend.participationView.repository;

import com.challenge1.backend.participationView.model.GraphId;
import com.challenge1.backend.participationView.model.GraphModel;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GraphRepository extends MongoRepository<GraphModel, GraphId> {

	GraphModel findByGraphId(GraphId graphId);

}
