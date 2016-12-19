﻿import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/switchMap';

import { LotService } from '../lot.service';
import { UserService } from '../../user/user.service';
import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';
import { Constant } from '../../globals';
import { ModalPickCardComponent } from '../../credit-card/pick-card-modal.component';

@Component({
    selector: 'lot-detail',
    templateUrl: `${Constant.appPath}app/lot/lot-detail/lot-detail.component.html`,
    styleUrls: [`${Constant.appPath}app/lot/lot-detail/lot-detail.component.css`],
    providers: [LotService, UserService, GeneralService],
    entryComponents: [ModalPickCardComponent]
})

export class LotDetailComponent implements OnInit, AfterViewInit {
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
        private generalServise: GeneralService,
        private notifService: NotificationsService,
        private sharedService: SharedService) {

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

    ngAfterViewInit() {
        console.log(this.sharedService.getSuccess());
        if (this.sharedService.getSuccess()) {
            this.successNewLotAddedNotif();
        }
        this.sharedService.saveSuccess(false);
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

    onCloseModal(event): void {
        console.log('CLOSE EVENT');
        console.log(event);
        this.modal = false;
        this.updateData();
        this.checkBetResult(event.betState);
    }

    checkBetResult(betState) {
        if (betState == 'success') {
            this.successNotif();
        }
        else if (betState == 'error') {
            this.errorNotif();
        }
    }

    errorNotif() {
        this.notifService.error(
            'Ошибка!',
            'Что-то пошло не так',
            {
                position: ["top", "right"],
                timeOut: 2500,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
                maxLength: 1000
            }
        )
    }

    successNewLotAddedNotif() {
        this.notifService.success(
            'Успех!',
            'Ваш лот успещно добавлен!',
            {
                position: ["top", "right"],
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
                maxLength: 1000
            }
        )
    }

    successNotif() {
        this.notifService.success(
            'Успех!',
            'Ваша ставка успешно принята',
            {
                position: ["top", "right"],
                timeOut: 2500,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
                maxLength: 1000
            }
        )
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
