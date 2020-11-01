import { Injectable } from '@angular/core';
import { Http, RequestOptions , Headers } from '@angular/http';  
import { Observable, throwError } from 'rxjs';  
import { Router } from '@angular/router';  
import { EmailDetail } from '../classes/email-detail';
import { OtpDetail } from '../classes/otp-detail';
import { ResetPwdDetail } from '../classes/reset-pwd-detail';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { jsonpFactory } from '@angular/http/src/http_module';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
  
//import { JwtHelperService } from '@auth0/angular-jwt';  
  
@Injectable({  
  providedIn: 'root'
})  
export class ForgotPwdService {  
  
  // Base URL  
  private  baseUrl = "http://localhost:8080/";  
  
    
  
  constructor(private http: HttpClient, private router : Router) { }  
  
  saveAdminDetails(email : EmailDetail) : Observable<any>  
  {  
      let url = this.baseUrl + "forgot-password";  
          console.log(email,"registered");
      
         return this.http.post(url,email).pipe(map((response: any) => {
          return(response.message)
         
      }),catchError((err: any) => {
           return throwError(err);
          }
        ))
      
      
  }  
  verifyOtp(token : OtpDetail) : Observable<any>
  {
    let url = this.baseUrl + "verify-otp";  
      //return this.http.post(url,token); 
      console.log(token)
      return this.http.post(url,token).pipe(map((response: any) => {
        return(response.message)
       
    }),catchError((err: any) => {
         return throwError(err);
        }

    ))
  }
  resetDetail(resetPwdDetail : ResetPwdDetail) : Observable<any>
  {
    let url = this.baseUrl + "reset-password";  
      //return this.http.post(url,resetPwdDetail); 
      return this.http.put(url,resetPwdDetail).pipe(map((response: any) => {
        return(response.message)
    }),catchError((err: any) => {
         return throwError(err);
        }

    ))
  }


  }
    
