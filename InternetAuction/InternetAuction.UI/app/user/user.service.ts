import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserService {
    private createURL = ''
    constructor(private http: Http) { }

    create(user) {
        let JSONstr = JSON.stringify({ firstname: user.firstName, lastname: user.lastName, password: user.password });
        console.log("json = " + JSONstr);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.createURL, JSONstr, { headers: headers })
            .map((response: Response) => {
                console.log("Response:" + response.json());
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}