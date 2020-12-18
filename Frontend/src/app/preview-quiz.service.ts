import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PreviewQuizService {

  constructor(private http: HttpClient) { }

  public getQuizByresultId(quizId): Observable<any>
  {
     return this.http.get<any>('http://localhost:8080/realtimeanalysis/'+quizId);
  }

  public deleteQuestionFromQuiz(quizId,quesId)
  {
    return this.http.post<any>('http://localhost:8080/participation-view/getGraphDataForQuesVsScore/'+quizId+'/'+quesId,69);
  }
}
