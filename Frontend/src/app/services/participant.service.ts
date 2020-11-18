import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { forkJoin } from "rxjs"; import { tap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private baseUrl = "http://localhost:8080/";

  constructor(private http: HttpClient, private router: Router) { }

  updateParticipant(quizId) {

    let url = this.baseUrl + "start-quiz/" + quizId;

    return this.http.get(url).pipe(map((response: any) => {
      return (response)
    }), catchError((err: any) => {
      return throwError(err);
    }
    ))

  }
  removeParticipant(quizId) {

    let url = this.baseUrl + "submit-quiz/" + quizId;

    return this.http.get(url).pipe(map((response: any) => {
      return (response)
    }), catchError((err: any) => {
      return throwError(err);
    }
    ))

  }
  checkParticipantDetails(username: string, quizId): Observable<any> {
    let url = this.baseUrl + "participation-view/verifyUsername/" + username + "/" + quizId;

    return this.http.post(url, username).pipe(map((response: any) => {
      return (response)

    }), catchError((err: any) => {
      return throwError(err);
    }
    ))


  }

}
