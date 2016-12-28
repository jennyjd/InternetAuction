import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Constant } from './globals';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GeneralService {
    private categoryUrl = `${Constant.apiEndpoint}/AuctionsCategories`;
    private getCurrencyUrl = `${Constant.apiEndpoint}/Currencies`;
    private getLotStateUrl = `${Constant.apiEndpoint}/GoodsState`;

    constructor(private http: Http, private router: Router) {
    }

    getCurrency() {
        return this.http.get(this.getCurrencyUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getCurrencyFromStorage() {
        return JSON.parse(localStorage.getItem('currency'));
    }

    getCurrencyById(id) {
        let currency = this.getCurrencyFromStorage();
        for (let curr of currency) {
            if (curr.Id == id) {
                return curr;
            }
        }
    }

    getCategories() {
        return this.http.get(this.categoryUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getLotState() {
        return this.http.get(this.getLotStateUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getLotStateFromStorage() {
        return JSON.parse(localStorage.getItem('lotStates'));
    }

    getLotStateById(id) {
        let lotStates = this.getLotStateFromStorage()
        for (let state of lotStates) {
            if (state.Id == id) {
                return state;
            }
        }
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
} 