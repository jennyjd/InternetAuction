import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Constant } from '../globals';
import { UserService } from '../user/user.service';
import { CreditCard } from './credit-card';
import { LoginComponent } from '../login/login.component';
import { LotService } from '../lot/lot.service';
import { CreditCardService } from './credit-card.service';

@Component({
    selector: 'pick-modal',
    templateUrl: `${Constant.appPath}app/credit-card/pick-card-modal.component.html`,
    styleUrls: [`${Constant.appPath}app/credit-card/pick-card-modal.component.css`],
    providers: [UserService, CreditCardService],
    entryComponents: [LoginComponent]
})

export class ModalPickCardComponent {
    path = Constant.path;
    @Output() closeModalEvent = new EventEmitter();
    @Output() closeUserModalEvent = new EventEmitter();
    @Input() betSum: any;
    @Input() fastSell: any;
    @Input() lotId: any;

    @Input() transfer: any;
    @Input() lot: any;

    errorMessage: any;
    nullUser: boolean = false;
    userCreditCards: CreditCard[] = [];
    choosedCard: any = {};
    model: any = {};
    betState: any;
    isDisabled: boolean = true;
    cardFocus: Array<boolean> = [];
    isFastSell: boolean = false;

    constructor(private userService: UserService, private lotService: LotService, private cardService: CreditCardService ) {
        this.getCards();
    }

    getCards() {
        let currentUser = this.userService.getCurrentUser();
        if (currentUser == null) {
            this.nullUser = true;
        }

        this.userService.getUserById(currentUser.Id)
            .subscribe(res => {
                for (let card of res.CreditCards) {
                    if (card.IsRemoved != true) {
                        this.userCreditCards.push(new CreditCard(card));
                    }
                }
            },
            error => this.errorMessage = <any>error);
    }

    closeModal() {
        this.closeModalEvent.emit({ event: true, betState: this.betState });
    }

    closeUserModal() {
        this.closeUserModalEvent.emit({ event: true });
    }

    transferMoney() {
        this.cardService.getMoney(this.lot.AuctionId, this.choosedCard.id)
            .subscribe(res => {
                this.lotService.seenAuctionResult(this.lot.resultId)
                    .subscribe(res => {
                        this.lot.isSeen = true;
                        this.closeUserModal();
                    },
                    error => this.errorMessage = <any>error);
            },
            error => this.errorMessage = <any>error);
    }

    makeBet() {
        if (this.transfer) {
            this.transferMoney();
        }
        else {
            this.checkFastSell();

            this.lotService.makeBet(this.lotId, this.choosedCard.id, this.betSum, this.model.cvv, this.isFastSell)
                .subscribe(res => {
                    this.betState = res.State;
                    this.closeModal();
                },
                error => {
                    this.errorMessage = error.json()
                    this.betState = this.errorMessage.State;
                    this.closeModal();
                });
        }
    }

    checkFastSell() {
        if (this.fastSell[1] == true) {
            this.isFastSell = true;
            return true;
        }
        return false;
    }

    chooseCard(card) {
        this.isDisabled = false;
        this.choosedCard = card;

        this.cardFocus = [];
        this.cardFocus[card.id] = !this.cardFocus[card.id];
    }
}