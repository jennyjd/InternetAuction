import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

import { User } from '../user/user';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
    private loginUrl = 'http://localhost:21561/api/account/login';
    public token: string;

    constructor(private http: Http, private router: Router,) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("Current user: " + currentUser)
    }

    login(model) {
        let JSONstr = JSON.stringify({ username: model.username, password: model.password });
        console.log("json = " + JSONstr)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.loginUrl, JSONstr, { headers: headers })
            .map(res => res.ok)
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    logout() {
        console.log("YOU WERE LOGOUTED");
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}