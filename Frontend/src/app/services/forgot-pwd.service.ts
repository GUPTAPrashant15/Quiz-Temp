import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { EmailDetail } from '../classes/email-detail';
import { OtpDetail } from '../classes/otp-detail';
import { ResetPwdDetail } from '../classes/reset-pwd-detail';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class ForgotPwdService {

  private baseUrl = "http://localhost:8080/";

  constructor(private http: HttpClient, private router: Router) { }

  saveAdminDetails(email: EmailDetail): Observable<any> {

    let url = this.baseUrl + "forgot-password";

    return this.http.post(url, email).pipe(map((response: any) => {
      return (response.message)

    }), catchError((err: any) => {
      return throwError(err);
    }
    ))
  }

  verifyOtp(token: OtpDetail): Observable<any> {

    let url = this.baseUrl + "verify-otp";

    return this.http.post(url, token).pipe(map((response: any) => {
      return (response.message)
    }), catchError((err: any) => {
      return throwError(err);
    }
    ))

  }

  resetDetail(resetPwdDetail: ResetPwdDetail): Observable<any> {

    let url = this.baseUrl + "reset-password";

    return this.http.put(url, resetPwdDetail).pipe(map((response: any) => {
      return (response.message)
    }), catchError((err: any) => {
      return throwError(err);
    }

    ))
  }

}
