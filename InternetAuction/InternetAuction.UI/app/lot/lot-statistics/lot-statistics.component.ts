import { Component } from '@angular/core';
import { Constant } from '../../globals';

import { LotService } from '../lot.service';

@Component({
    selector: 'statistics',
    templateUrl: `${Constant.appPath}app/lot/lot-statistics/lot-statistics.component.html`,
    styleUrls: [`${Constant.appPath}app/lot/lot-statistics/lot-statistics.component.css`],
    providers: [LotService]
})

export class LotStatisticsComponent {
    errorMessage: any;
    ownerStat: any[] = [];
    participantStat: any[] = [];
    viewStats: any[] = [];
    firstTab: boolean = false;
    menu: string[] = ['Ваши лоты в продаже', 'Аукционы с вашими ставками'];

    constructor(private lotService: LotService) {
        this.getStatistics();
    }

    getStatistics() {
        this.lotService.getAuctionsHistoryForOwner()
            .subscribe(res => {
                this.ownerStat = res;
                this.addLots(this.ownerStat);               
            },
            error => this.errorMessage = <any>error);

        this.lotService.getAuctionsHistoryForParticipant()
            .subscribe(res => {
                this.participantStat = res;
                this.addLots(this.participantStat);               
            },
            error => this.errorMessage = <any>error);
    }

    addLots(stats) {
        for (let lot of stats) {
            this.lotService.getLotById(lot.AuctionId)
                .subscribe(res => {
                    lot.Auction = res;
                    if (lot.MaxBet != 0) { lot.betDone = true }
                    else { lot.betDone = false }
                    console.log(stats);
                },
                error => this.errorMessage = <any>error);
        }
    }

    changeViewStats(menuel) {
        if (this.menu.indexOf(menuel) == 0) {
            this.viewStats = this.ownerStat;
            this.firstTab = true;
        }
        else if (this.menu.indexOf(menuel) == 1) {
            this.viewStats = this.participantStat;
            this.firstTab = false;
        }
    }
}
