import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, RequestMethod, Request} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Constant } from '../globals';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LotService {
    private lotsUrl = `${Constant.apiEndpoint}/Auctions`;
    private betUrl = `${Constant.apiEndpoint}/Auctions/Bet`;

    constructor(private http: Http) {
    }

    getLotById(id) {
        return this.http.get(`${this.lotsUrl}/${id}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getLots() {
        return this.http.get(this.lotsUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    makeBet(auctionId, creditId, sum, cvv) {
        let JSONstr = JSON.stringify({CreditCardId: creditId, Sum: sum, Cvv: cvv});
        console.log("json = " + JSONstr)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(`${this.betUrl}/${auctionId}`, JSONstr, { headers: headers, withCredentials: true })
            .map(res => res.ok)
            .catch(this.handleError);
    }

    createLot(lot) {
        console.log(lot);
        console.log(lot.currencyId);
        let JSONstr = JSON.stringify({
            Name: lot.name, Description: lot.description, StartPrice: lot.startPrice, 
            PriceOfFastSell: lot.fastSell, CategoryId: lot.categoryId, EndDate: lot.endDate, 
            GoodStateId: lot.stateId, CurrencyId: lot.currencyId});
        console.log("json = " + JSONstr)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.lotsUrl, JSONstr, { headers: headers, withCredentials: true })
            .map(res => res.ok)
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}