import { Component, OnInit, AfterViewInit } from '@angular/core';
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
    modal: boolean = false;
    betDone: boolean = false;
    isUserAuth: boolean;
    myDate = new Date();
    lotIsYours: boolean = true;
    redeemBool: boolean = false;
    currency = Constant.currency;
    betAmmountErrors: string[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private lotservise: LotService,
        private userServise: UserService,
        private generalServise: GeneralService,
        private notifService: NotificationsService,
        private sharedService: SharedService) {

        this.isUserAuth = this.isUserAuthorized()
        this.redeemBool = false;
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.lotservise.getLotById(+params['id']))
            .subscribe(res => {
                this.selected_lot = res;

                this.checkIfLotIsYours();

                this.getCurrentBet(this.selected_lot);
                this.getTimeLeft();

                console.log(this.selected_lot);
                this.lotState = this.selected_lot.GoodsState.Name;
                this.getCurrencySign();
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

    getCurrencySign() {
        for (let prop in this.currency) {
            if (this.selected_lot.CurrencyId == prop) {
                this.selected_lot.currencySign = this.currency[prop];
            }
        }
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

    checkIfLotIsYours() {
        let currentUser = this.userServise.getCurrentUser();
        if (currentUser.Id != this.selected_lot.ClientId) {
            this.lotIsYours = false;
        }
    }

    makeBet(sum) {
        let bet = parseInt(sum.model);
        this.betAmmountErrors = [];
        console.log(bet);
        console.log(this.selected_lot.PriceOfFastSell);
        console.log(this.selected_lot.currentBet);
        if (this.selected_lot.currentBet != 0) {
            if (bet <= this.selected_lot.currentBet) {
                this.betAmmountErrors.push("Ваша ставка должна быть больше текущей!"); return;
            }
        }
        else if (bet <= this.selected_lot.StartPrice) {
            this.betAmmountErrors.push("Ваша ставка должна быть больше начальной!"); return;
        }
        else if (this.selected_lot.PriceOfFastSell != null) {
            if (bet > this.selected_lot.PriceOfFastSell) {
                this.betAmmountErrors.push("Ваша ставка больше стоимости выкупа! Чтобы выкупить данный лот, нажмите на кнопку 'Выкупить'"); return;
            }
            else if (bet == this.selected_lot.PriceOfFastSell) {
                this.betAmmountErrors.push("Ваша ставка cоответствует стоимости выкупа! Чтобы выкупить данный лот, нажмите на кнопку 'Выкупить'"); return;
            }
        }
        this.changeModal();     
    }

    changeModal() {
        this.modal = !this.modal;
    }

    redeem() {
        this.redeemBool = true;
        this.changeModal();
    }

    getTimeLeft() {
        let currentDate = new Date();
        let ourDate = new Date(Date.parse(this.selected_lot.EndDate));
        ourDate.setHours(ourDate.getHours() - 3);//GMT +03
        console.log(ourDate);
        this.selected_lot.timeLeft = ourDate;
    }

    onCloseModal(event): void {
        this.modal = false;
        this.updateData();
        this.checkBetResult(event.betState);
    }

    checkBetResult(betState) {
        console.log(betState);
        if (betState == 0) { this.successNotif("Аукцион завершен!"); }
        else if (betState == 2) { this.errorNotif("Введеные некорректные данные по банковской карте!"); }
        else if (betState == 3) { this.successNotif("Ваша ставка успешно принята!"); }
        else if (betState == 4) { this.errorNotif("На вашей карте недостаточно средств!"); }
    }

    errorNotif(msg) {
        this.notifService.error(
            'Ошибка!',
            msg,
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

    successNotif(msg) {
        this.notifService.success(
            'Успех!',
            msg,
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
        this.lotservise.getLotById(this.selected_lot.Id)
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
