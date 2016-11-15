﻿import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

import { User } from '../user/user'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
    private loginUrl = 'http://localhost:21561/api/account/login';
    public token: string;

    constructor(private http: Http, private router: Router,) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("Current user: " + currentUser)
        this.token = currentUser && currentUser.token;
    }

    login(model): Observable<boolean> {
        let JSONstr = JSON.stringify({ username: model.username, password: model.password });
        console.log("json = " + JSONstr)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.loginUrl, JSONstr, { headers: headers })
            .map((response: Response) => {
                console.log("Response:" + response.json());
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: model.username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        console.log("YOU WERE LOGOUTED");
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}