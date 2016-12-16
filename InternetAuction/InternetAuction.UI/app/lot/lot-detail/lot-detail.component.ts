import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { LotService } from '../lot.service';
import { UserService } from '../../user/user.service';
import { GeneralService } from '../../general.service';
import { Constant } from '../../globals';
import { ModalPickCardComponent } from '../../credit-card/pick-card-modal.component';

@Component({
    selector: 'lot-detail',
    templateUrl: `${Constant.appPath}app/lot/lot-detail/lot-detail.component.html`,
    styleUrls: [`${Constant.appPath}app/lot/lot-detail/lot-detail.component.css`],
    providers: [LotService, UserService, GeneralService],
    entryComponents: [ModalPickCardComponent]
})

export class LotDetailComponent implements OnInit {
    selected_lot: any = {};
    userInformation: any = {};
    errorMessage: any;
    model: any = {};
    lotState: string = '';
    currency: string = '';
    modal: boolean = false;
    betDone: boolean = false;
    isUserAuth: boolean;
    myDate = new Date();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private lotservise: LotService,
        private userServise: UserService,
        private generalServise: GeneralService) {

        this.isUserAuth = this.isUserAuthorized()
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.lotservise.getLotById(+params['id']))
            .subscribe(res => {
                this.selected_lot = res;

                this.getCurrentBet(this.selected_lot);
                this.getTimeLeft();

                console.log(this.selected_lot);
                this.lotState = this.selected_lot.GoodsState.Name;
                this.currency = this.selected_lot.Currency.ShortName;
                this.getUserInf();
            },
            error => this.errorMessage = <any>error);
    }

    getCurrentBet(lot) {
        this.lotservise.getCurrentBet(lot.Id)
            .subscribe(res => {
                console.log(res);
                this.selected_lot.currentBet = res;
                this.checkCurrBet();
            },
            error => this.errorMessage = <any>error);
    }

    checkCurrBet() {
        if (this.selected_lot.currentBet != 0) {
            this.betDone = true;
        }
    }

    changeModal() {
        this.modal = !this.modal;
    }

    getTimeLeft() {
        let currentDate = new Date();
        let ourDate = new Date(Date.parse(this.selected_lot.EndDate));
        ourDate.setHours(ourDate.getHours() - 3);//GMT +03
        console.log(ourDate);
        this.selected_lot.timeLeft = ourDate;
    }

    onCloseModal(state: boolean): void {
        this.modal = false;
        this.updateData();
    }

    updateData() {
        this.getCurrentBet(this.selected_lot);
        this.getTimeLeft();
    }

    isUserAuthorized() {
        if (this.userServise.getCurrentUser() == null) { return false; }
        return true;
    }

    getUserInf() {
        this.userServise.getUserById(this.selected_lot.ClientId)
            .subscribe(res => {
                this.userInformation = res;
            },
            error => this.errorMessage = <any>error);
    }

    checkFastSell(lot) {
        if (lot.PriceOfFastSell == null) { return false; }
        return true;
    }
}
