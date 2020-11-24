import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { CreateQuizService } from 'src/app/create-quiz.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { SocialMediaAuthService } from '../_services/social-media-auth.service';
import { AlertDialog } from '../add-questions/add-questions.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    loginErrorCredentials = false;
    loginErrorEmail = false;

    invalidLogin = false

    /**This variable is set true on successful login */
    loginSuccess=false;


    // successMessage: string;

    /**message to be displayed for invalid credentials */
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

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private service: CreateQuizService,
        private socialMediaAuth:SocialMediaAuthService,
        private authService: SocialAuthService,
        public dialog: MatDialog
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    googleSignIn(){
    this.authService.authState.subscribe((user) => {
        if(user!=null)
        {
            this.user = user;
            this.loggedIn = (user != null);
            this.socialMedia()
        }});
        if(!this.loggedIn){
            this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)}
    console.log('inside GS')
    
    }
  
  
    /**
   * This methods calls the Social Media Authentication service to log the user into a session to acces the Proposal Improvement System Application. The credentials are checked in the Database to either Sign Up or Sign In the user.
   */
    socialMedia(){
        console.log('inside social media')
    //  this.socialData={"email":this.user["email"],"password":"password"}
        this.socialData={"firstName": this.user["name"], "lastName": "GoogleUser", "emailId": this.user["email"], "number": "9999999999", "password": "Qwerty@123"}
    
      
        console.log("after2____",this.user)
        console.log(this.socialData);
        this.socialMediaAuth.socialMediaLogin(this.socialData.emailId, this.socialData.password).subscribe(
        (response:any) => 
    {
        if (response == "SUCCESS") {
            console.log("After succesful login")
            console.log(response)
            sessionStorage.setItem('authenticatedUser',"SUCCESS");
            sessionStorage.setItem('currentUser', this.socialData.emailId);
            this.service.passUsername(this.socialData.emailId);
            this.router.navigate(['/dashboard'])
        }
        else if(response == "FAILURE"){
            this.loginErrorEmail = true;        
        }
      }
      ,
      (error)=>{
        console.log("error------",error['error']);
      }
    );
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        sessionStorage.setItem('authenticatedUser',"FAILURE");
        sessionStorage.setItem('currentUser', "null");
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        let logout = document.getElementById('logout');
        logout.style.display = "none";

        let dashboard = document.querySelector('.navButton');
        dashboard.textContent = "";

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.loginErrorCredentials = false;
        this.loginErrorEmail = false;
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        /**
         * checks for authentication 
         * and then logs the user in
         * or shows an error
         * 
         * also changes the setLoggedIn flag
         *  */    
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {

                    if (data.message == "SUCCESS") {
                        this.service.passUsername(this.f.username.value);
                        
                        this.router.navigate(['/dashboard']);
                        sessionStorage.setItem('currentUser', (this.f.username.value));
                        
                        //this.authenticationService.setLoggedIn(true);
                    }
                    else if (data.message == "FAILURE")
                        this.loginErrorEmail = true;

                    else {
                        this.loginErrorCredentials = true;
                    }

                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

    /**
     * routes to forget password component
     */
    onForget() {
        this.router.navigate(['/forgotten-password']);
    }
}
