import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddQuestionsService {

  constructor(private http:HttpClient) { }

  // public addQuestions(questions){
  //   return this.http.post("http://localhost:8080/addQuestions",questions,{responseType:'text' as 'json'});
  // }

  public addQuestions(questions,quizId){
    // console.log(quizId);
    return this.http.post("http://localhost:8080/addQuestions/"+quizId,questions,{responseType:'text' as 'json'});
  }
}
