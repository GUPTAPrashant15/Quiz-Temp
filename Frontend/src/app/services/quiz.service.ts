import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Injectable, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { Quiz } from '../models';
import { Answer } from '../models/answer';

@Injectable()
export class QuizService {

  private baseUrl = "http://localhost:8080/";

  constructor(private http: HttpClient, private router: Router,public datepipe: DatePipe) { }

  get(id: number): Observable<any> {
    let url = this.baseUrl + "participation-view/quiz-view/" + id;
    return this.http.post(url, id).pipe(map((response: any) => {
       const dateNow = new Date();
      //  console.log(dateNow);
       dateNow.setMinutes(dateNow.getMinutes()+30);
       dateNow.setHours(dateNow.getHours()+5);
      //  console.log(dateNow);
       const dateNow1=this.datepipe.transform(dateNow, 'MM/dd/yyyy hh:mm:ss');
      //  console.log(dateNow1);
      //  const dateNow=this.datepipe.transform(new Date(), 'MM/dd/yyyy hh:mm:ss');
      
      // console.log(this.datepipe.transform(dateNow, 'MM/dd/yyyy hh:mm:ss'));
      
      response.startDate=this.datepipe.transform(response.startDate, 'MM/dd/yyyy hh:mm:ss');
      response.endDate=this.datepipe.transform(response.endDate, 'MM/dd/yyyy hh:mm:ss');
      // console.log((!response.liveStatus));
      // console.log(!(response.startDate<dateNow1 && response.endDate>dateNow1));
      
      // console.log((!response.liveStatus || !(response.startDate<dateNow1 && response.endDate>dateNow1)));
      if (!response.liveStatus || !(response.startDate<dateNow1 && response.endDate>dateNow1)) {
        this.router.navigate(['/quiz-not-found']);
        
        console.log(dateNow1);
        
        console.log(response.startDate);
        console.log(response.endDate);
        // console.log(response.startDate<dateNow1);
        // console.log(response.endDate>dateNow1);
      } else {
        console.log(dateNow1);
        response.startDate=this.datepipe.transform(response.startDate, 'MM/dd/yyyy hh:mm:ss');
        response.endDate=this.datepipe.transform(response.endDate, 'MM/dd/yyyy hh:mm:ss');
        console.log(response.startDate);
        console.log(response.endDate);
        console.log(response.startDate<dateNow1);
        console.log(response.endDate>dateNow1);
        
        return (response)
      }
      
    }), catchError((err: any) => {
      return throwError(err);
    }
    ))
  }

  liveUserNumber(quizId: number) {
    let url = this.baseUrl + "show-live/" + quizId;
    return this.http.get(url).pipe(map((response: any) => {
      return (response)
    }), catchError((err: any) => {
      return throwError(err);
    }
    ))

  }

  saveAnswer(answer: Answer) {
      let url = this.baseUrl + "participation-view/quiz-score/" + answer.userName + "/" + answer.quizId + "/" + answer.quesId + "/" + answer.answer;
    return this.http.put(url, answer).pipe(map((response: any) => {
      console.log(response);
      return (response)
    }), catchError((err: any) => {
      return throwError(err);
    }
    ))

  
    
  }

  submitQuiz(username, quizId,remTime) {

    let url = this.baseUrl + "participation-view/getUserScore/" + username + "/" + quizId + "/" + remTime;
    
    return this.http.get(url).pipe(map((response: any) => {
      console.log(response);
      return (response)


    }), catchError((err: any) => {
      return throwError(err);
    }
    ))

  }

}
