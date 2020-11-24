import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-app';
  isButtonVisible=false;
  constructor(
    private _router: Router,
    private authenticationService: AuthenticationService,
    private authService: SocialAuthService){

  }


logOut(){
  // sessionStorage.removeItem('currentUser');
  sessionStorage.setItem('currentUser', 'null');
  sessionStorage.setItem('authenticatedUser', 'null');
  sessionStorage.clear()
  this.authService.signOut();
  // this.authenticationService.setLoggedIn(false);
  this._router.navigate(['/login'])

}}
