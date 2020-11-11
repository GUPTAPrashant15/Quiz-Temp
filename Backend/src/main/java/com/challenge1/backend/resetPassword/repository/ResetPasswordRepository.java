
package com.challenge1.backend.resetPassword.repository;

import com.challenge1.backend.resetPassword.model.ResetPasswordModel;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResetPasswordRepository extends MongoRepository<ResetPasswordModel, Long> {

    public ResetPasswordModel findByEmailId(String emailId);
    public ResetPasswordModel findByEmailIdAndOtp(String emailId, String otp);

}
