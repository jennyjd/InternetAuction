import { Component } from '@angular/core';
import { Router} from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';
import { CreditCard } from '../../credit-card/credit-card';
import { CreditCardService } from '../../credit-card/credit-card.service';

@Component({
    selector: 'user-details',
    templateUrl: './app/user/user-detail/user-detail.component.html',
    styleUrls: ['./app/user/user-detail/user-detail.component.css'],
    providers: [UserService, CreditCardService]
})

export class UserDetailsComponent {
    personalLabels: string[] = ["Логин", "Фамилия", "Имя", "Отчество", "Почта"];
    cardLabels: string[] = ["Владелец", "Срок действия"];
    addCardLabels: string[] = ["Номер", "Владелец", "Срок действия"];

    editPersonalInf: boolean = false;
    addNewCard: boolean = false;

    editUserModel: any = {};
    currentUser: any = {};

    newCardModel: any = {};
    userCreditCards: CreditCard[] = [];

    errorMessage: any;

    constructor(private userService: UserService, private creditService: CreditCardService) {
        this.getUser();
    }

    validate(value) {
        //сделать нормально
        if (this.newCardModel.number.length == 4 || this.newCardModel.number.length == 9 || this.newCardModel.number.length == 14) {
            this.newCardModel.number += " ";
        }
    }

    getUser() {
        let currentUserId = this.userService.getCurrentUser().Id;
        this.userService.getUserById(currentUserId)
            .subscribe(res => {
                this.checkForEmptyFields(res);

                for (let card of res.CreditCards) {
                    this.userCreditCards.push(new CreditCard(card));
                }
                console.log(this.userCreditCards);
                                
                this.currentUser = res;
            },
            error => this.errorMessage = <any>error);
        this.userService.getUserAccountById(currentUserId)
            .subscribe(res => {
                this.currentUser.Login = res.UserName;
                this.currentUser.Email = res.Email;
            },
            error => this.errorMessage = <any>error);
    }

    checkForEmptyFields(res) {
        for (var key in res) {
            if (res.hasOwnProperty(key) && res[key] == null) {
                res[key] = "-";
            }
        }
    }

    changeUserInf() {
        this.editPersonalInf = false;
    }

    addNewCardSubmit() {
        this.addNewCard = false;
        let Name = this.newCardModel.ownerName.split(" ");
        this.newCardModel.userFirstName = Name[0];
        this.newCardModel.userLastName = Name[1];
        this.newCardModel.number = this.newCardModel.number.replace(/\s+/g, '');
        //изменить на последний день месяца
        this.newCardModel.validThru = this.newCardModel.validMonth + "-28-20" + this.newCardModel.validYear;

        this.creditService.addNewCard(this.newCardModel, this.currentUser.Id)
            .subscribe(
            res => {
                this.userCreditCards.push(new CreditCard(res[0]));
            },
            error => {
                this.errorMessage = error;
            });
    }

}
