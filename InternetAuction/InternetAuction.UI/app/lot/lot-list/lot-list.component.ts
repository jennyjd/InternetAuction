import { Component, Input, Output, EventEmitter } from '@angular/core'

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

export class LotListComponent {
    errorMessage: any;
    uncompletedLots: any[] = [];
    loading: boolean = true;
    currency = Constant.currency;
    lots: any[] = [];

    constructor(private lotService: LotService, private userService: UserService, private sharedService: SharedService,
        private generalService: GeneralService) {
        this.getLots();
        console.log(this.lots);
    }

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
                console.log("Currency", lot);

                this.lots.push(lot);

                if (lotAmmount == 1) { this.loading = false; }
            },
            error => this.errorMessage = <any>error)
    }
}
