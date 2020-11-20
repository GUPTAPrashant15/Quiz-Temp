import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { CreateQuizService } from 'src/app/create-quiz.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    loginErrorCredentials = false;
    loginErrorEmail = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private service: CreateQuizService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

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
