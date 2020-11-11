
package com.challenge1.backend.resetPassword.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reset-password")
public class ResetPasswordModel {

    @Id
    private ObjectId id;
    private String message;
    private String emailId;
    private String otp;


    public ResetPasswordModel() {
    }


    public ResetPasswordModel(ObjectId id, String message, String emailId, String otp) {
        this.id = id;
        this.message = message;
        this.emailId = emailId;
        this.otp = otp;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ResetPasswordModel [emailId=" + emailId + ", id=" + id + ", message=" + message + ", otp=" + otp
                + "]";
    }

}
