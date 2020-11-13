import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgotPwdService } from '../services/forgot-pwd.service';
import { EmailDetail } from '../classes/email-detail';
import { OtpDetail } from '../classes/otp-detail';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {​​​​​​​ NgxSpinnerService }​​​​​​​ from "ngx-spinner";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private emailDetail = new EmailDetail();
  private otpDetail = new OtpDetail();
  errorValidation = false;

  constructor(private forgotPwdService: ForgotPwdService, private router: Router , private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    let logout = document.getElementById('logout');
    logout.style.display = "none";

    let dashboard = document.querySelector('.navButton');
    dashboard.textContent = "";

  }
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
  });
  


  EmailForm(EmailInformation) {
    { this.spinner.show();
      this.emailDetail.emailId = this.Email.value;
      this.otpDetail.emailId = this.Email.value;

      this.forgotPwdService.saveAdminDetails(this.emailDetail).subscribe(
        response => {
         
          if (response == "SUCCESS") {
            
            this.router.navigateByUrl('/otp-verify', { state: { email: this.emailDetail.emailId } });
            this.spinner.hide();
          }
          else {
            this.errorValidation = true;
          }
        },
        (error) => console.log('error', error)
      );
    }
  }
  get Email() {
    return this.form.get('email');
  }

}
