import { Component } from '@angular/core';

import { LotService } from '../lot/lot.service';
import { Constant } from '../globals';

@Component({
    selector: 'admin',
    templateUrl: `${Constant.appPath}app/admin/admin.component.html`,
    styleUrls: [`${Constant.appPath}app/admin/admin.component.css`],
    providers: [LotService]
})

export class AdminComponent {
    errorMessage: any;
    viewLots: any[] = []
    currentLots: any[] = [];
    completedLots: any[] = [];
    completedTab: boolean = false;
    currency = Constant.currency;
    menu: string[] = ['Действующие аукционы', 'Завершенные аукционы'];

    constructor(private lotService: LotService) {
        this.getAllHistory();
    }

    getAllHistory() {
        this.lotService.getAllHistory()
            .subscribe(res => {
                this.viewLots = res;
                console.log(res);
                for (let lot of res) {
                    if (lot.MaxBet != 0) {
                        lot.betDone = true;
                        lot.BetDate = lot.BetDate.slice(0, 10);
                    }
                    else { lot.betDone = false; }

                    lot.Auction.StartDate = lot.Auction.StartDate.slice(0, 10);

                    this.getCurrencySign(lot);

                    if (lot.Auction.IsCompleted == false) {
                        this.currentLots.push(lot);
                    }
                    else {
                        this.completedLots.push(lot);
                    }
                }
            },
            error => this.errorMessage = <any>error);
    }

    getCurrencySign(lot) {
        for (let prop in this.currency) {
            if (lot.Auction.CurrencyId == prop) {
                lot.Auction.currencySign = this.currency[prop];
            }
        }
    }

    changeViewLots(menuel) {
        if (this.menu.indexOf(menuel) == 0) {
            this.viewLots = this.currentLots;
            this.completedTab = false;
        }
        else if (this.menu.indexOf(menuel) == 1) {
            this.viewLots = this.completedLots;
            this.completedTab = true;
        }
    }
}
