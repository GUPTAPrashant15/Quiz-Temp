import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailDetail } from '../classes/email-detail';
import { OtpDetail } from '../classes/otp-detail';
import { ForgotPwdService } from '../services/forgot-pwd.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  private otpDetail = new OtpDetail();
  private emailDetail = new EmailDetail();
  allowResendOTP = false;
  errorOTP = false;

  constructor(private forgotPwdService: ForgotPwdService, private router: Router) { }

  ngOnInit(): void {
    let logout = document.getElementById('logout');
    logout.style.display = "none";

    let dashboard = document.querySelector('.navButton');
    dashboard.textContent = "";
    this.otpDetail.emailId = history.state.email;
    this.emailDetail.emailId = this.otpDetail.emailId;

    setTimeout(() => {
      this.allowResendOTP = true;
    }, 6000);
  }
  form = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")]),
  });
  onCancel() {
    this.router.navigate(['/login']);
  }


  OtpForm(OtpInformation) {
    {
      this.otpDetail.otp = this.Otp.value;
      this.forgotPwdService.verifyOtp(this.otpDetail).subscribe(
        response => {
          if (response == "SUCCESS") {
            this.router.navigateByUrl('/reset-pwd', { state: { email: this.emailDetail.emailId } });
          }
          else {
            this.errorOTP = true;
          }
        },
        (error) => console.log('error', error)
      )

    }
  }
  onResend() {

    this.allowResendOTP = false;
    setTimeout(() => {
      this.allowResendOTP = true;
    }, 600000);

    this.forgotPwdService.saveAdminDetails(this.emailDetail).subscribe(
      response => {
        if (response == "SUCCESS") {
          //alert("OTP Generated SUCCESSFULLY");
          this.router.navigateByUrl('/otp-verify', { state: { email: this.emailDetail.emailId } });
        }
        else {
          alert("User does not exist!")
        }
      },
      (error) => console.log('error', error)

    );
    this.router.navigate(['/otp-verify']);
  }
  get Otp() {
    return this.form.get('otp');
  }

}
