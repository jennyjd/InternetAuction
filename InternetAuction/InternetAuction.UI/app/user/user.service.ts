import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Constant } from '../globals';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    private createURL = `${Constant.apiEndpoint}/clients`;
    private getUserURL = `${Constant.apiEndpoint}/clients/GetClientAccount`;
    constructor(private http: Http) { }

    create(user, credit) {

        let UserJSON = JSON.stringify({
            FirstName: user.firstName, LastName: user.lastName, Login: user.login,
            Password: user.password, Email: user.email, CreditCards: [{
                Number: credit.Number, ValidTo: credit.validThru,
                OwnerFirstName: credit.userFirstName, OwnerLastName: credit.userLastName
            }]
        });

        console.log("json = " + UserJSON);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.createURL, UserJSON, { headers: headers })
            .map(res => res)
            .catch(this.handleError);
    }

    getUserById(id) {
        return this.http.get(`${this.getUserURL}/${id}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUserId'));
    }
}