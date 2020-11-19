import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
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
    private authenticationService: AuthenticationService){

  }


logOut(){
  this.authenticationService.setLoggedIn(false);
  this._router.navigate(['/login'])


}}
