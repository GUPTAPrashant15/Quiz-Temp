﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
            // this.loginForm = this.formBuilder.group({
            //     username: ['', Validators.required],
            //     password:['',[Validators.required, Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]


            // });
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
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.message=="SUCCESS"){
                        // alert("LOGIN SUCCESSFULLY");
                         this.router.navigate(['/dashboard']);
                         this.authenticationService.setLoggedIn(true);
                    }
                    else if(data.message=="FAILURE")
                    alert("EMAIL NOT FOUND");
                    else{
                        alert("Wrong Credentials");
                    }
                   
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
    onForget(){
        this.router.navigate(['/forgotten-password']);
    }
}
