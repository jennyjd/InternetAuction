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
    private getCurBet = `${Constant.apiEndpoint}/Auctions/GetCurrentBet`; 
    private ownerLotStatistics = `${Constant.apiEndpoint}/Auctions/GetAuctionsHistoryForOwner`;
    private participantLotStatistics = `${Constant.apiEndpoint}/Auctions/GetAuctionsHistoryForParticipant`;
    private getAuctionResultsUrl = `${Constant.apiEndpoint}/Auctions/GetAuctionsResults`;
    private seenResultUrl = `${Constant.apiEndpoint}/Auctions/SeenAuctionResults`;
    private getAuctionHistory = `${Constant.apiEndpoint}/Auctions/GetAuctionsHistory`;

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

    getCurrentBet(auctionId) {
        return this.http.get(`${this.getCurBet}/${auctionId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    makeBet(auctionId, creditId, sum, cvv, isFastSell) {
        console.log(auctionId, creditId, sum, cvv, isFastSell);
        let JSONstr = '';
        if (isFastSell) {
            JSONstr = JSON.stringify({ CreditCardId: creditId.toString(), Cvv: cvv });
        }
        else {
            JSONstr = JSON.stringify({ CreditCardId: creditId.toString(), Sum: sum, Cvv: cvv });
        }
        console.log("json = " + JSONstr)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(`${this.betUrl}/${auctionId}/${isFastSell}`, JSONstr, { headers: headers, withCredentials: true })
            .map(response => response.json());
            //.catch(this.handleError);
    }

    createLot(lot) {
        console.log(lot);
        console.log(lot.currencyId);
        let JSONstr = JSON.stringify({
            Name: lot.name, Description: lot.description, StartPrice: lot.startPrice, 
            PriceOfFastSell: lot.fastSell, CategoryId: lot.categoryId.toString(), EndDate: lot.endDate, 
            GoodStateId: lot.stateId.toString(), CurrencyId: lot.currencyId.toString()});
        console.log("json = " + JSONstr)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.lotsUrl, JSONstr, { headers: headers, withCredentials: true })
            .map(res => res.json())
            .catch(this.handleError);
    }

    getAuctionsHistoryForOwner() {
        return this.http.get(this.ownerLotStatistics, { withCredentials: true })
            .map(response => response.json())
            .catch(this.handleError);
    }

    getAuctionsHistoryForParticipant() {
        return this.http.get(this.participantLotStatistics, { withCredentials: true })
            .map(response => response.json())
            .catch(this.handleError);
    }

    getAuctionResults() {
        return this.http.get(this.getAuctionResultsUrl, { withCredentials: true })
            .map(response => response.json())
            .catch(this.handleError);
    }

    seenAuctionResult(resultId) {
        let JSONstr = JSON.stringify([resultId]);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.seenResultUrl, JSONstr, { headers: headers, withCredentials: true })
            .map(response => response.ok)
            .catch(this.handleError);
    }

    getAllHistory() {
        return this.http.get(this.getAuctionHistory, { withCredentials: true })
            .map(response => response.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}