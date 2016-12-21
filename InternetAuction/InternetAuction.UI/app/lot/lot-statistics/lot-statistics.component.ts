import { Component } from '@angular/core';
import { Constant } from '../../globals';

import { LotService } from '../lot.service';
import { UserService } from '../../user/user.service';

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
    completedOwnerStat: any[] = [];
    completedParticipantStat: any[] = [];
    viewStats: any[] = [];
    ownerTab: boolean = false;
    completedTab: boolean = false;
    menu: string[] = ['Ваши лоты', 'Аукционы с вашими ставками', 'Ваши завершенные аукционы', 'Завершенные аукционы с вашими ставками'];

    constructor(private lotService: LotService, private userService: UserService) {
        this.getStatistics();
    }

    getStatistics() {
        this.lotService.getAuctionsHistoryForOwner()
            .subscribe(res => {
                this.addLots(res, this.ownerStat, 0);               
            },
            error => this.errorMessage = <any>error);

        this.lotService.getAuctionsHistoryForParticipant()
            .subscribe(res => {
                this.addLots(res, this.participantStat, 1);               
            },
            error => this.errorMessage = <any>error);
    }

    addLots(result, stats, index) {
        for (let lot of result) {
            console.log(lot);
            this.lotService.getLotById(lot.AuctionId)
                .subscribe(res => {
                    lot.Auction = res;
                    if (lot.MaxBet != 0) { lot.betDone = true }
                    else { lot.betDone = false }

                    if (res.IsCompleted == true) {
                        if (index == 0) {
                            this.getWinnerInf(lot);
                        }
                        else {
                            this.completedParticipantStat.push(lot);
                        }
                    }
                    else {
                        stats.push(lot);
                    }
                },
                error => this.errorMessage = <any>error);
        }
    }

    getWinnerInf(lot) {
        this.userService.getUserAccountById(lot.CustomerId)
            .subscribe(res => {
                lot.Winner = res;
                console.log("WINNER");
                console.log(lot.Winner);
                this.completedOwnerStat.push(lot);
            },
            error => this.errorMessage = <any>error);
    }

    changeViewStats(menuel) {
        if (this.menu.indexOf(menuel) == 0) {
            this.viewStats = this.ownerStat;
            this.ownerTab = true;
            this.completedTab = false;
        }
        else if (this.menu.indexOf(menuel) == 1) {
            this.viewStats = this.participantStat;
            this.ownerTab = false;
            this.completedTab = false;
        }
        else if (this.menu.indexOf(menuel) == 2) {
            this.viewStats = this.completedOwnerStat;
            this.ownerTab = true;
            this.completedTab = true;
        }
        else if (this.menu.indexOf(menuel) == 3) {
            this.viewStats = this.completedParticipantStat;
            this.ownerTab = false;
            this.completedTab = true;
        }
    }
}
