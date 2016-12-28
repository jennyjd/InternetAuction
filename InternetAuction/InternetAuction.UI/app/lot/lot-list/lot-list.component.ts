import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core'

import { LotComponent } from '../lot.component'
import { LoadingComponent } from '../../loading/loading.component';
import { Lot } from '../lot'

import { LotService } from '../lot.service';
import { UserService } from '../../user/user.service';
import { SharedService } from '../../shared.service';
import { Constant } from '../../globals';
import { GeneralService } from '../../general.service';

@Component({
    selector: 'lot-list',
    templateUrl: `${Constant.appPath}app/lot/lot-list/lot-list.component.html`,
    styleUrls: [`${Constant.appPath}app/lot/lot-list/lot-list.component.css`],
    entryComponents: [LotComponent, LoadingComponent],
    providers: [LotService, UserService, SharedService]
})

export class LotListComponent implements DoCheck{
    errorMessage: any;
    uncompletedLots: any[] = [];
    loading: boolean = true;
    currency = Constant.currency;
    lots: any[] = [];
    searchStr: string = '';
    searchLots: any[] = [];
    viewLots: any[] = []; 

    //backArrow: boolean = false;

    constructor(private lotService: LotService, private userService: UserService, private sharedService: SharedService,
        private generalService: GeneralService) {
        this.getLots();
    }

    ngDoCheck() {
        this.searchStr = this.sharedService.getSearch();
        if (this.searchStr != '') {
            this.getSearchedLots();
            this.sharedService.saveSearch('');
        }
    }

    getSearchedLots() {
        this.searchLots = [];
        let reg;
        reg = new RegExp(this.searchStr, 'i');
        for (let lot of this.lots) {
            if (lot.Name.match(reg) != null) {
                this.searchLots.push(lot);
            }
        }
        if (this.searchLots.length != 0) {
            this.viewLots = this.searchLots;
            //this.backArrow = true;
        }
    }

    /*viewAllLots() {
        this.viewLots = this.lots;
        this.backArrow = false;
    }*/

    getLots() {
        this.lotService.getLots()
            .subscribe(res => {
                this.addData(res);
            },
            error => this.errorMessage = <any>error);
    }

    addData(res) {
        let lotAmmount = this.getUncompletedLots(res);
        if (lotAmmount == 0) { this.loading = false; }
        for (let lot of this.uncompletedLots) {
            this.userService.getUserAccountById(lot.ClientId)
                .subscribe(res => {
                    lot.userLogin = res.UserName;                        
                    this.getCurrentBet(lot, lotAmmount);
                    lotAmmount--;
                },
                error => this.errorMessage = <any>error)
        }; 
    }

    getUncompletedLots(res) {
        let counter = 0;
        for (let lot of res) {
            if (lot.IsCompleted == false) {
                this.uncompletedLots.push(lot);
                counter++;
            }
        }
        return counter;
    }

    getCurrencySign(lot) {
        for (let prop in this.currency) {
            if (lot.CurrencyId == prop) {
                lot.currencySign = this.currency[prop];
            }
        }
    }

    getCurrentBet(lot, lotAmmount) {
        this.lotService.getCurrentBet(lot.Id)
            .subscribe(res => {
                lot.CurrentBet = res;

                if (lot.CurrentBet != 0) { lot.betDone = true }
                else { lot.betDone = false }

                lot.EndDate = new Date((Date.parse(lot.EndDate)));
                lot.EndDate.setHours(lot.EndDate.getHours() - 3);//GMT+03

                lot.fastSell = true;
                if (lot.PriceOfFastSell == null) {
                    lot.fastSell = false;
                }
                this.getCurrencySign(lot);

                this.lots.push(lot);

                if (lotAmmount == 1) {
                    this.loading = false;
                    this.viewLots = this.lots;
                }
            },
            error => this.errorMessage = <any>error)
    }
}
