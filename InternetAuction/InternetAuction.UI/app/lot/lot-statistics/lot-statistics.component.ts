import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    path = Constant.path;
    errorMessage: any;
    ownerStat: any[] = [];
    participantStat: any[] = [];
    completedOwnerStat: any[] = [];
    completedParticipantStat: any[] = [];
    viewStats: any[] = [];
    ownerTab: boolean = false;
    completedTab: boolean = false;
    auctionResults: any[] = [];
    currency = Constant.currency;
    menu: string[] = ['Ваши лоты', 'Аукционы с вашими ставками', 'Ваши завершенные аукционы', 'Завершенные аукционы с вашими ставками'];

    constructor(private lotService: LotService, private userService: UserService, private router: Router) {
        this.getAuctionResults();
        this.getStatistics();
    }

    getStatistics() {
        this.lotService.getAuctionsHistoryForOwner()
            .subscribe(res => {
                console.log("OWNER", res);  
                this.addLots(res, this.ownerStat, true);             
            },
            error => this.errorMessage = <any>error);

        this.lotService.getAuctionsHistoryForParticipant()
            .subscribe(res => {
                console.log("PARTIC", res); 
                this.addLots(res, this.participantStat,  false);               
            },
            error => this.errorMessage = <any>error);
    }

    addLots(result, stats, forOwner) {
        if (result != null) {
            for (let lot of result) {
                this.lotService.getLotById(lot.AuctionId)
                    .subscribe(res => {
                        lot.Auction = res;
                        this.getCurrencySign(lot);
                        if (lot.MaxBet != 0) { lot.betDone = true }
                        else { lot.betDone = false }

                        if (lot.IsCompleted && forOwner) {
                            this.getWinnerInf(lot);
                        }
                        else if (lot.IsCompleted && !forOwner) {
                            this.detectUnseenLots(lot, this.completedParticipantStat);
                        }
                        else {
                            console.log('LOT', lot);
                            stats.push(lot);
                        }

                    },
                    error => this.errorMessage = <any>error);
            }
        }
    }

    viewLotDetails(lotId) {
        this.router.navigate(['/lotdetail', lotId]);
    }

    getCurrencySign(lot) {
        for (let prop in this.currency) {
            if (lot.Auction.CurrencyId == prop) {
                lot.Auction.currencySign = this.currency[prop];
            }
        }
    }

    getAuctionResults() {
        this.lotService.getAuctionResults()
            .subscribe(res => {
                this.auctionResults = res;
            },
            error => this.errorMessage = <any>error);
    }

    detectUnseenLots(lot, completed) {
        lot.isSeen = true;
        for (let result of this.auctionResults) {
            if (result.AuctionId == lot.AuctionId) {
                lot.isSeen = result.IsSeenResult;
                lot.resultId = result.Id;
            }
        }
        completed.push(lot);
    }

    confirmDeal(lot) {
        this.lotService.seenAuctionResult(lot.resultId)
            .subscribe(res => {
                console.log(res);
                lot.isSeen = true;
            },
            error => this.errorMessage = <any>error);
    }


    getWinnerInf(lot) {
        console.log('USER', lot, lot.CustomerId);
        if (lot.CustomerId != null) {
            this.userService.getUserAccountById(lot.CustomerId)
                .subscribe(res => {
                    lot.Winner = res;
                    this.detectUnseenLots(lot, this.completedOwnerStat);
                },
                error => this.errorMessage = <any>error);
        }
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

