import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//import { environment } from '@environments/environment';
import {environment} from '../../environments/environment'
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

     login(emailId: string, password: string) {
    //     return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
    //         .pipe(map(user => {
    //             // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
    //             // user.authdata = window.btoa(email + ':' + password);
    //             // localStorage.setItem('currentUser', JSON.stringify(user));
    //             // this.currentUserSubject.next(user);
    //             console.log(user);
    //             return user;
    //         }));
    return this.http.post(`${environment.apiUrl}/login`, { emailId, password }).pipe(map((response: any) => {
        // const data = response.json();
        // console.log("andr aa gya ")
        // localStorage.setItem('currentUser', JSON.stringify(emailId));
        //  this.currentUserSubject.next(user);
        return(response)
        // console.log(data);
       
       
    }),catchError((err: any) => {
        console.log(err);
         return throwError(err);
        }
      ))
    }
    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}