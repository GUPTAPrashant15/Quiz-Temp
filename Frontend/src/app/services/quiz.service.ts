import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { Quiz } from '../models';
import { Answer } from '../models/answer';

@Injectable()
export class QuizService {
  // Base URL  
  private  baseUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  get(id: number) : Observable<any> {
    let url = this.baseUrl + "participation-view/quiz-view/"+id;
          console.log(id,"fetched");
          return this.http.post(url,id).pipe(map((response: any) => {
            console.log(response)
            return(response)
           
        }),catchError((err: any) => {
             return throwError(err);
            }
          ))
        
    // return this.http.get(id);
  }
  liveUserNumber(quizId: number){
    let url = this.baseUrl + "show-live/" + quizId;  
    return this.http.get(url).pipe(map((response: any) => {
      return(response)
     
  }),catchError((err: any) => {
       return throwError(err);
      }
    ))

  }
  saveAnswer(answer: Answer){
    let url = this.baseUrl + "participation-view/quiz-score/"+answer.userName+"/"+answer.quizId+"/"+answer.quesId+"/"+answer.answer;  
          console.log(answer.userName,"saved");
          return this.http.put(url,answer).pipe(map((response: any) => {
            console.log(response);
            return(response)
           
        }),catchError((err: any) => {
             return throwError(err);
            }
          ))
  }
  submitQuiz(username , quizId){
    let url = this.baseUrl + "participation-view/getUserScore/"+username+"/"+quizId;  
          // console.log(time,"saved");
          
          return this.http.get(url).pipe(map((response: any) => {
            return(response)
           
        }),catchError((err: any) => {
             return throwError(err);
            }
          ))
  }
  // saveQuizDetails(id : number) : Observable<any>  
  // {  
  //     let url = this.baseUrl + "forgot-password";  
  //         console.log(id,"fetched");
      
  //        return this.http.post(url,id).pipe(map((response: any) => {
  //         return(response.message)
         
  //     }),catchError((err: any) => {
  //          return throwError(err);
  //         }
  //       ))
      
      
  // }  
  // getAll() {
  //   return [
  //     { id: 'data/test-quiz.json', name: 'Test Quiz'}
  //   ];
  // }

}
