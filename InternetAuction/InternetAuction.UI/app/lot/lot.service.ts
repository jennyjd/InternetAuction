import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, RequestMethod, Request} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LotService {
    private lotsUrl = 'http://localhost:21561/api/Auctions';

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

    createLot(lot) {
        let JSONstr = JSON.stringify({
            Name: lot.name, Description: lot.description, StartPrice: lot.startPrice, 
            PriceOfFastSell: null, CategoryId: lot.categoryId, EndDate: "12-07-2016", 
            CurrencyId: lot.currencyID, ClientId: 4, GoodStateId: lot.stateId});
        console.log("json = " + JSONstr)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.lotsUrl, JSONstr, { headers: headers })
            .map(res => res.ok)
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}