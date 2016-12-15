import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Constant } from '../globals';
import { UserService } from '../user/user.service';
import { CreditCard } from './credit-card';
import { LoginComponent } from '../login/login.component';
import { LotService } from '../lot/lot.service';

@Component({
    selector: 'pick-modal',
    templateUrl: `${Constant.appPath}app/credit-card/pick-card-modal.component.html`,
    styleUrls: [`${Constant.appPath}app/credit-card/pick-card-modal.component.css`],
    providers: [UserService],
    entryComponents: [LoginComponent]
})

export class ModalPickCardComponent {
    @Output() closeModalEvent = new EventEmitter<boolean>();
    @Input() betSum: any;
    @Input() lotId: any;
    errorMessage: any;
    nullUser: boolean = false;
    userCreditCards: CreditCard[] = [];
    choosedCard: any = {};
    model: any = {};
    isDisabled: boolean = true;
    cardFocus: Array<boolean> = [];

    constructor(private userService: UserService, private lotService: LotService ) {
        this.getCards();
    }

    getCards() {
        let currentUser = this.userService.getCurrentUser();
        if (currentUser == null) {
            this.nullUser = true;
        }

        console.log(currentUser.Id);
        this.userService.getUserById(currentUser.Id)
            .subscribe(res => {
                for (let card of res.CreditCards) {
                    this.userCreditCards.push(new CreditCard(card));
                }
                console.log(this.userCreditCards);
            },
            error => this.errorMessage = <any>error);
    }

    closeModal() {
        this.closeModalEvent.emit(true);
    }

    makeBet() {
        console.log(this.model);
        console.log(this.choosedCard);
        console.log(this.betSum);
        console.log(this.lotId);
        this.lotService.makeBet(this.lotId, this.choosedCard.id, this.betSum, this.model.cvv)
            .subscribe(res => {            
                console.log(res);
        },
            error => this.errorMessage = <any>error);
    }

    chooseCard(card) {
        this.isDisabled = false;
        this.choosedCard = card;

        this.cardFocus = [];
        this.cardFocus[card.id] = !this.cardFocus[card.id];
    }
}