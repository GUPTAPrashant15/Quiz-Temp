import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
@Injectable({
  providedIn: 'root'
})
/**
* This is service for register the quiz and get data by username and for get status of Quiz. Is Quiz open or closed?
*/
export class CreateQuizService {
  
/**
* By default username
*/
  private username = new BehaviorSubject<string>("MrBean8955");
  public share = this.username.asObservable();
  constructor(private http: HttpClient) { }
  
/**
* this is method for sharing username for one component to another.
*/
  public passUsername(text) {
    this.username.next(text);
  }
  
/**
* this is method to regiseter the Quiz into database by quiz name, quiz description, username, etc..
*/
  public registerQuiz(quiz) {
    return this.http.post("http://localhost:8080/addQuiz", quiz, { responseType: 'text' as 'json' });
  }

/**
* This is method to get the Quiz by username.
*/
  public getQuiz(username: any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/list/' + username);
  }
  
/**
* this is method to post the status of Quiz in database.
*/
  public changeQuizStatus(quizId ){
    return this.http.post('http://localhost:8080/changeQuizStatus/' +quizId,1).pipe(map((response: any) => {
      return (response)
    }), catchError((err: any) => {
      return throwError(err);
    }
    ))
  }
}
