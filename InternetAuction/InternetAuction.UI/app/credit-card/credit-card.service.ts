import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Constant } from '../globals';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CreditCardService {
    private cardUrl = `${Constant.apiEndpoint}/CreditCards`;

    constructor(private http: Http, private router: Router) { }

    addNewCard(model, id) {
        let JSONstr = JSON.stringify([{
            "Number": model.number,
            "ValidTo": model.validThru,
            "OwnerFirstName": model.userFirstName,
            "OwnerLastName": model.userLastName }]);
        console.log("json = " + JSONstr)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(`${this.cardUrl}/${id}`, JSONstr, { headers: headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}