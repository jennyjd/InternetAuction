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
    private getLotStateUrl = '';


    constructor(private http: Http, private router: Router) {
    }

    getCurrency() {
        return this.http.get(this.getCurrencyUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getCategories() {
        return this.http.get(this.categoryUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getLotState() {
        return this.http.get('')
            .map(response => response.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
} 