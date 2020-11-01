import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from  '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http:HttpClient) { }
  _url='http://localhost:8080/signup';

register(userData){
  console.log(userData,"registered");
   return this._http.post(this._url,userData).pipe(map((response: any) => {
    // const data = response.json();
    return(response.message)
    // console.log(data);
   
   
}),catchError((err: any) => {
     return throwError(err);
    }
  ))
}}