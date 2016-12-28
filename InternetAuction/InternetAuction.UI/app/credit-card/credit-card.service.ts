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
    private deleteCardUrl = `${Constant.apiEndpoint}/CreditCards/DeleteCard`;
    private getMoneyonCardUrl = `${Constant.apiEndpoint}/Auctions/GetMoney`;

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
            .map((res: Response) => res.json());
            //.catch(this.handleError);
    }

    deleteCard(cardId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(`${this.deleteCardUrl}/${cardId}`, { headers: headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getMoney(auctionId, creditCardId) {
        return this.http.get(`${this.getMoneyonCardUrl}/${auctionId}/${creditCardId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}