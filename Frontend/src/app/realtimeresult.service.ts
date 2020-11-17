import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {results} from 'src/app/real';
import {UserData} from 'src/app/real';
import {Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class RealtimeresultService {

  private _url: string = "/assets/Data/results.json";
  constructor(private http: HttpClient) { }
  getResultById(quizId): Observable<any>
  {
     return this.http.get<any>('http://localhost:8080/participation-view/realtimeanalysis/'+quizId);
  }
  getResults():Observable<UserData[]>{
   return this.http.get<UserData[]>(this._url);
  }

  public getQuizById(quizId): Observable<any>
  {
     return this.http.get<any>('http://localhost:8080/realtimeanalysis/'+quizId);
  }
  public changeQuizStatus(quizId ){
    return this.http.post('http://localhost:8080/changeQuizStatus/' +quizId,1).pipe(map((response: any) => {
      return (response)
    }), catchError((err: any) => {
      return throwError(err);
    }
    ))
  }

}
