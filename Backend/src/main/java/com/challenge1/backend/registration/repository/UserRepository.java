package com.challenge1.backend.registration.repository;

import com.challenge1.backend.registration.model.UserModel;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserModel, Long>{

    public UserModel findByEmailId(String emailId);
    // public UserModel findByEmailIdAndPassword(String emailId, String password);

}
