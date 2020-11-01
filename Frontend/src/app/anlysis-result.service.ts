import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IgraphData } from './GraphData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnlysisResultService {

  private _url: string="/assets/Data/graphData.json";

  constructor(private http: HttpClient) { }

  getData(): Observable<IgraphData[]>{
    return this.http.get<IgraphData[]>(this._url);
  }
}
