import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreateQuizService {

  constructor(private http:HttpClient) { }

  public registerQuiz(quiz){
    return this.http.post("http://localhost:8080/addQuiz",quiz,{responseType:'text' as 'json'});
  }

   public getQuiz(username:any): Observable<any>{
     return this.http.get<any>('http://localhost:8080/list/'+username);
}
}
