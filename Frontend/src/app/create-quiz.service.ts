import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreateQuizService {
  private username = new BehaviorSubject<string>("rinkuyadav8955");
  public share = this.username.asObservable();
  constructor(private http: HttpClient) { }
  public passUsername(text) {
    this.username.next(text);
  }
  public registerQuiz(quiz) {
    return this.http.post("http://localhost:8080/addQuiz", quiz, { responseType: 'text' as 'json' });
  }

  public getQuiz(username: any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/list/' + username);
  }
}
