import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GeneralService {
    private categoryUrl = 'http://localhost:21561/api/AuctionsCategories';
    private getCurrencyUrl = '';


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

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
} 