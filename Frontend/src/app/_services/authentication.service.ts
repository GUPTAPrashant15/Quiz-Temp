import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//import { environment } from '@environments/environment';
import { environment } from '../../environments/environment'
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private loggedInStatus = false

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(emailId: string, password: string) {
    return this.http.post(`${environment.apiUrl}/login`, { emailId, password }).pipe(map((response: any) => {
      return (response)
    }), catchError((err: any) => {
      console.log(err);
      return throwError(err);
    }
    ))
  }

  logout() {
    // remove user from local storage to log user out
    // sessionStorage.removeItem('currentUser');
    sessionStorage.setItem('currentUser', 'null');
    this.currentUserSubject.next(null);
  }
}