import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Constant } from '../globals';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    private userURL = `${Constant.apiEndpoint}/clients`;
    private getAccountURL = `${Constant.apiEndpoint}/clients/GetClientAccount`;//?
    private createAdminURL = `${Constant.apiEndpoint}/Account/CreateAdministrator`;//?
    constructor(private http: Http) { }

    create(user, credit) {

        let UserJSON = JSON.stringify({
            FirstName: user.firstName, LastName: user.lastName, Login: user.login,
            Password: user.password, Email: user.email, CreditCards: [{
                Number: credit.number, ValidTo: credit.validThru,
                OwnerFirstName: credit.userFirstName, OwnerLastName: credit.userLastName
            }]
        });

        //console.log("json = " + UserJSON);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.userURL, UserJSON, { headers: headers })
            .map(res => res);
            //.catch(this.handleError);
    }

    createAdmin(admin) {
        let UserJSON = JSON.stringify({ UserName: admin.login,Password: admin.password, Email: admin.email});

        console.log("json = " + UserJSON);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.createAdminURL, UserJSON, { headers: headers, withCredentials: true})
            .map(res => res)
            .catch(this.handleError);
    }

    getUserById(id) {
        return this.http.get(`${this.userURL}/${id}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getUserAccountById(id) {
        return this.http.get(`${this.getAccountURL}/${id}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUserId'));
    }
}