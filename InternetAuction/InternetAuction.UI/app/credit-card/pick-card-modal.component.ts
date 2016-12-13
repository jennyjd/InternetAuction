import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Constant } from '../globals';
import { UserService } from '../user/user.service';
import { CreditCard } from './credit-card';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'pick-modal',
    templateUrl: `${Constant.appPath}app/credit-card/pick-card-modal.component.html`,
    styleUrls: [`${Constant.appPath}app/credit-card/pick-card-modal.component.css`],
    providers: [UserService],
    entryComponents: [LoginComponent]
})

export class ModalPickCardComponent {
    @Output() closeModalEvent = new EventEmitter<boolean>();
    errorMessage: any;
    nullUser: boolean = false;
    userCreditCards: CreditCard[] = [];
    choosedCard: any = {};
    model: any = {};
    isDisabled: boolean = true;
    cardFocus: Array<boolean> = [];

    constructor(private userService: UserService) {
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
    }

    chooseCard(card) {
        this.isDisabled = false;
        this.choosedCard = card;

        this.cardFocus = [];
        this.cardFocus[card.id] = !this.cardFocus[card.id];
    }
}