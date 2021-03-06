﻿import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

import { User } from '../user/user';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../globals';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
    private loginUrl = `${Constant.apiEndpoint}/account/signin`;
    private logoutUrl = `${Constant.apiEndpoint}/account/signout`;

    constructor(private http: Http, private router: Router) {
        let currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
    }

    login(model) {
        let JSONstr = JSON.stringify({ username: model.username, password: model.password });
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.loginUrl, JSONstr, { headers: headers, withCredentials: true})
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    logout() {
        return this.http.get(this.logoutUrl, { withCredentials: true })
            .map(response => response.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}