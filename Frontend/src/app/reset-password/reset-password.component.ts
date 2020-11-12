import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpDetail } from '../classes/otp-detail';
import { ResetPwdDetail } from '../classes/reset-pwd-detail';
import { ForgotPwdService } from '../services/forgot-pwd.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private resetPwdDetail = new ResetPwdDetail();
  private otpDetail = new OtpDetail();

  constructor(private forgotPwdService: ForgotPwdService, private router: Router,
    private fb: FormBuilder) { }
  form: FormGroup = new FormGroup({});

  ngOnInit(): void {

    let logout = document.getElementById('logout');
    logout.style.display = "none";

    let dashboard = document.querySelector('.navButton');
    dashboard.textContent = "";

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })

    this.resetPwdDetail.emailId = history.state.email;
  }

  onCancel() {
  }

  public barLabel: string = "Password strength:";

  get f() {
    return this.form.controls;
  }

  ResetPwdForm(ResetPwdInformation) {
    {
      this.resetPwdDetail.password = this.Password.value;

      this.forgotPwdService.resetDetail(this.resetPwdDetail).subscribe(
        response => {

          if (response == "SUCCESS") {
           // alert("RESET SUCCESSFULLY")

            this.router.navigateByUrl('/reset-success', {
              state: {
                email: this.resetPwdDetail.emailId, password:
                  this.resetPwdDetail.password
              }
            });
          }
          else {
            alert("TRY AGAIN")
          }
        },
        (error) => console.log('error', error)
      )
    }
  }

  get Password() {
    return this.form.get('password');
  }
}
