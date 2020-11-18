import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IgraphData } from './GraphData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnlysisResultService {

  constructor(private http: HttpClient) { }

  public getQuizByresultId(quizId): Observable<any>
  {
     return this.http.get<any>('http://localhost:8080/realtimeanalysis/'+quizId);
  }
  public getGraphData(quizId,quesId)
  {
    return this.http.post<any>('http://localhost:8080/participation-view/getGraphDataForQuesVsScore/'+quizId+'/'+quesId,69);
  }
}
