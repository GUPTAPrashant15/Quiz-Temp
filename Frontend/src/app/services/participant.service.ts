import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import {forkJoin} from "rxjs"; import {tap} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  
  // Base URL  
  private  baseUrl = "http://localhost:8080/";  

  constructor(private http: HttpClient, private router : Router) { }

  updateParticipant(quizId){
    let url = this.baseUrl + "start-quiz/"+quizId;  
    // console.log(time,"saved");
    console.log(url ,"yes i am here ");
    return this.http.get(url).pipe(map((response: any) => {
      console.log("aa gya huuu")
      return(response)
     
  }),catchError((err: any) => {
       return throwError(err);
      }
    ))

// saveQ
  }
  removeParticipant(quizId){
    let url = this.baseUrl + "submit-quiz/"+quizId;  
    // console.log(time,"saved");
    console.log(url ,"yes i am here ");
    return this.http.get(url).pipe(map((response: any) => {
      console.log("aa gya huuu")
      return(response)
     
  }),catchError((err: any) => {
       return throwError(err);
      }
    ))

// saveQ
  }
  checkParticipantDetails(username: string , quizId  ) : Observable<any>  
  {  
      let url = this.baseUrl + "participation-view/verifyUsername/"+username+"/"+quizId;  
          console.log(username,"registered");
      
          // this.http.get(http://localhost:8080/start-quiz/4);
          
         return this.http.post(url,username) .pipe(map((response: any) => {
           console.log(response);
          return(response)
         
      }),catchError((err: any) => {
           return throwError(err);
          }
        ))
      
      
  } 

}
