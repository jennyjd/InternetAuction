import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { User } from '../user';
import { UserService } from '../user.service';
import { CreditCard } from '../../credit-card/credit-card';
import { CreditCardService } from '../../credit-card/credit-card.service';
import { Constant } from '../../globals';
import { LotStatisticsComponent } from '../../lot/lot-statistics/lot-statistics.component';


@Component({
    selector: 'user-details',
    templateUrl: `${Constant.appPath}app/user/user-detail/user-detail.component.html`,
    styleUrls: [`${Constant.appPath}app/user/user-detail/user-detail.component.css`],
    providers: [UserService, CreditCardService],
    entryComponents: [LotStatisticsComponent]
})

export class UserDetailsComponent {
    path = Constant.path;
    personalLabels: string[] = ["Логин", "Фамилия", "Имя", "Почта"];
    cardLabels: string[] = ["Владелец", "Срок действия"];
    addCardLabels: string[] = ["Номер", "Владелец", "Срок действия"];

    editPersonalInf: boolean = false;
    addNewCard: boolean = false;
    changePassword: boolean = false;
    passErrorsDetected: boolean = false;

    editUserModel: any = {};
    currentUser: any = {};

    userLogin: string = '';
    userEmail: string = '';

    newCardModel: any = {};
    userCreditCards: CreditCard[] = [];

    pass: any = {};

    errorMessage: any;
    errorsDetected: boolean = false;
    monthError: boolean = false;
    yearError: boolean = false;
    cardError: boolean = false;

    constructor(private userService: UserService, private creditService: CreditCardService, private notifService: NotificationsService) {
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

                console.log('User',res);

                for (let card of res.CreditCards) {
                    if (card.IsRemoved != true) {
                        this.userCreditCards.push(new CreditCard(card));
                    }
                }
             
                this.currentUser = res;
            },
            error => this.errorMessage = <any>error);
        this.userService.getUserAccountById(currentUserId)
            .subscribe(res => {
                this.userLogin = res.UserName;
                this.userEmail = res.Email;
            },
            error => this.errorMessage = <any>error);
    }

    openPassChange() {
        this.changePassword = true;
    }

    changePass(pass, pass2) {
        if (pass.model != pass2.model) {
            this.passErrorsDetected = true;
            return false
        }
    }

    deleteCard(cardId) {
        if (this.userCreditCards.length != 1) {
            this.creditService.deleteCard(cardId)
                .subscribe(res => {
                    console.log('OK');
                    this.userCreditCards = [];
                    this.getUser();

                    /* for (let index in this.userCreditCards) {
                         console.log('ids',this.userCreditCards[index].id);
                         if (this.userCreditCards[index].id == cardId) {
                             delete this.userCreditCards[index];
                             console.log('deleted', this.userCreditCards[index].id);
                         }
                     }*/
                },
                error => this.errorMessage = <any>error);
        }
        else {
            console.log("КУКУ");
            this.successNewLotAddedNotif();
        }
    }

    successNewLotAddedNotif() {
        this.notifService.success(
            'Успех!',
            'Ваш лот успешно добавлен!',
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

    showAddCardForm() {
        this.addNewCard = true;
        this.newCardModel.number = '';
        this.newCardModel.ownerName = '';
        this.newCardModel.validMonth = '';
        this.newCardModel.validYear = '';
        this.errorsDetected = false;
        this.monthError = false;
        this.yearError = false;
    }

    closeCardForm() {
        this.addNewCard = false;
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

    checkAddNewCardForm(inputs) {
        for (let item of inputs) {
            if (item.errors != null) {
                this.errorsDetected = true;
                return false
            }
            if (item.name == "validMonth") {
                if (parseInt(item.model) > 12 || parseInt(item.model) < 1) {
                    this.monthError = true;
                    return false
                }
            }
            else if (item.name == "validYear") {
                if (parseInt(item.model) < 16) {
                    this.yearError = true;
                    return false
                }
            }
        }
        return true
    }

    addNewCardSubmit(inputs) {
        this.cardError = false;
        if (!this.checkAddNewCardForm(inputs)) {
            return false
        }
        else {
            this.addNewCard = false;
            let Name = this.newCardModel.ownerName.split(" ");
            this.newCardModel.userFirstName = Name[0];
            this.newCardModel.userLastName = Name[1];
            this.newCardModel.number = this.newCardModel.number.replace(/\s+/g, '');
            //изменить на последний день месяца
            this.newCardModel.validThru = this.newCardModel.validMonth + "-28-20" + this.newCardModel.validYear;

            this.creditService.addNewCard(this.newCardModel, this.currentUser.Id)
                .subscribe(res => {
                    this.userCreditCards.push(new CreditCard(res[0]));
                },
                error => {
                    this.cardError = true;
                });
        }
    }

}
