
package com.challenge1.backend.resetpassword.repository;

import com.challenge1.backend.resetpassword.model.ResetPasswordModel;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResetPasswordRepository extends MongoRepository<ResetPasswordModel, Long> {

    public ResetPasswordModel findByEmailId(String emailId);
    public ResetPasswordModel findByEmailIdAndOtp(String emailId, String otp);

}
