import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { environment } from '@environments/environment';
import {environment} from '../../environments/environment';
//import {environment} from '../../environments/environment.prod';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
}