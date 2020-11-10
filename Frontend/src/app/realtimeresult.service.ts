import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {results} from 'src/app/real';
import {UserData} from 'src/app/real';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RealtimeresultService {

  private _url: string = "/assets/Data/results.json";
  constructor(private http: HttpClient) { }
  getResults():Observable<UserData[]>{
   return this.http.get<UserData[]>(this._url);
  }

  public getQuizById(quizId): Observable<any>
  {
     return this.http.get<any>('http://localhost:8080/realtimeanalysis/'+quizId);
  }

}
