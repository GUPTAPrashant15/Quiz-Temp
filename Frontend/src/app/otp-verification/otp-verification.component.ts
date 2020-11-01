import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailDetail } from '../classes/email-detail';
import { OtpDetail } from '../classes/otp-detail';
import { ForgotPwdService } from '../services/forgot-pwd.service';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  private otpDetail = new OtpDetail();  
  private emailDetail = new EmailDetail();  
  allowResendOTP=false;

  constructor(private forgotPwdService : ForgotPwdService, private router : Router) { }

  ngOnInit(): void {
    this.otpDetail.emailId = history.state.email;
    this.emailDetail.emailId=this.otpDetail.emailId;
    console.log(this.otpDetail.emailId)
    
    setTimeout(() => {
      this.allowResendOTP=true;
    },600000);
  }
  form = new FormGroup({    
    otp : new FormControl('' ,[Validators.required,Validators.pattern("^[0-9]{6}$")] ),      
  });  
  onCancel(){
    this.router.navigate(['/login']);
  }
  
  
  OtpForm(OtpInformation)  
  {
     {
        this.otpDetail.otp = this.Otp.value;
        console.log(this.otpDetail);
        this.forgotPwdService.verifyOtp(this.otpDetail).subscribe(  
        response => {
                if(response=="SUCCESS"){
                  alert("OTP Verified SUCCESSFULLY")
                  this.router.navigateByUrl('/reset-pwd',{ state: { email: this.emailDetail.emailId}}); 
                } 
                else {
                  alert("TRY AGAIN")
                }
                console.log('success',response)
              },
               (error)=> console.log('error',error)
        )
        
     }    
  } 
  onResend()   {
    console.log(this.emailDetail);
    this.allowResendOTP=false;
    setTimeout(() => {
      this.allowResendOTP=true;
    },600000);
  
    this.forgotPwdService.saveAdminDetails(this.emailDetail).subscribe(  
    response => {  
        let result = response.json();  

        if(result > 0)  
        {  
          this.router.navigate(['/otp-verify']);  
        }  
        else  
        {  
            alert("Email id is not registered.")  
        }  
    },  
    error => {  
      alert("error occur while checking User. please try after sometime.")  
    }  
    
  );  
  this.router.navigate(['/otp-verify']);


    

  }
  get Otp(){  
      return this.form.get('otp');  
  }   

}

