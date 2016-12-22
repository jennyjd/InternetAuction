import { Component, Input, Output, EventEmitter } from '@angular/core'
import { LotComponent } from '../lot.component'
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
    entryComponents: [LotComponent],
    providers: [LotService, UserService, SharedService]
})

export class LotListComponent {
    errorMessage: any;
    uncompletedLots: any[] = [];
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

    getCurrentBet(lot, lotAmmount) {
        this.lotService.getCurrentBet(lot.Id)
            .subscribe(res => {
                lot.CurrentBet = res;

                if (lot.CurrentBet != 0) { lot.betDone = true }
                else { lot.betDone = false }

                lot.EndDate = new Date((Date.parse(lot.EndDate)));
                lot.EndDate.setHours(lot.EndDate.getHours() - 3);//GMT+03

                //lot.mainPicture = "https://pp.vk.me/c419225/v419225009/6e41/vv2MqgXalNw.jpg";

                lot.CurrencyName = this.generalService.getCurrencyById(lot.CurrencyId).ShortName;
                console.log("Currency", lot.CurrencyName);
                this.lots.push(lot);

                if (lotAmmount == 1) { console.log("Загрузка лотов завершена"); }
            },
            error => this.errorMessage = <any>error)
    }
}
