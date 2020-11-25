import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialog } from '../add-questions/add-questions.component';
import { SocialUser } from "angularx-social-login";
import { SocialMediaAuthService } from '../_services/social-media-auth.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup
  regErrorEmail = false;
  errorMessage = "Invalid Credentials"

    /**This variable stores user data */
    userData;

    /**this variable stores user data when loggedin via social media */
    socialData;
    // uData
    private user: SocialUser;

    /**Flag to check if user has logged in earlier via social media*/
    private loggedIn: boolean;

    /**@ignore */
    public res

  constructor(public fb: FormBuilder, 
    private http: HttpClient, 
    private _RegistrationService: RegistrationService, 
    private _router: Router, 
    public dialog: MatDialog,
    private socialMediaAuth:SocialMediaAuthService,
    private authService: SocialAuthService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      number: ['', [Validators.required, Validators.pattern("[0-9]{3}[0-9]{2}[0-9]{5}"), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    })
  }

  ngOnInit(): void {
    let logout = document.getElementById('logout');
    logout.style.display = "none";

    let dashboard = document.querySelector('.navButton');
    dashboard.textContent = "";
  }
  
  onSubmit() {
    console.log('Form value-')
    console.log(this.form.value)
    this._RegistrationService.register(this.form.value)
      .subscribe(
        (response) => {
          if (response == "SUCCESS") {
            this.dialog.open(AlertDialog, { data: { message: 'Registered successfully!' } });
            this._router.navigate(['/login'])
          }
          else {
            this.regErrorEmail = true;
          }
        }, (error) => console.log('error', error)
      );
  }

  onClick() {
    this._router.navigate(['/login']);
  }

}
