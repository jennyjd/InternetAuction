import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Constant } from '../globals';
import { UserService } from '../user/user.service';
import { SharedService } from '../shared.service';

@Component({
    selector: 'registration',
    templateUrl: `${Constant.appPath}app/registration/registration.component.html`,
    styleUrls: [`${Constant.appPath}app/registration/registration.component.css`]
})

export class RegistrationComponent {
    userModel: any = {};
    creditModel: any = {};
    loading = false;
    errorsDetected: boolean = false;
    monthError: boolean = false;
    yearError: boolean = false;

    constructor(private router: Router, private userService: UserService, private sharedService: SharedService) {
    }

    register(inputs) {
        this.yearError = false;
        this.monthError = false;
        if (this.checkInputs(inputs) == false) {
            return
        }
        else {
            this.loading = true;
            this.dataUpdate();
            this.userService.create(this.userModel, this.creditModel)
                .subscribe(
                res => {
                    this.sharedService.saveSuccess(true);
                    this.router.navigate(['/login']);
                },
                error => {
                    console.log("ERROR");
                    this.loading = false;
                });
        }
    }

    checkInputs(inputs) {
        if (!this.checkPasswords(inputs)) { return false }
        for (let item of inputs) {
            if (item.errors != null) {
                this.errorsDetected = true;
                return false
            }
            if (item.name == "ValidMonth") {
                if (parseInt(item.model) > 12 || parseInt(item.model) < 1) {
                    this.monthError = true;
                    return false
                }
            }
            else if (item.name == "ValidYear") {
                if (parseInt(item.model) < 16) {
                    this.yearError = true;
                    return false
                }
            }
        }
        return true
    }

    checkPasswords(inputs) {
        let pass = '';
        let pass2 = '';
        for (let item of inputs) {
            if (item.name == "password") {
                pass = item.model;
            }
            else if (item.name == "password2") {
                pass2 = item.model;
            }
        }
        if (pass != pass2) {
            this.errorsDetected = true;
            return false
        }
        return true
    }

    dataUpdate() {
        let Name = this.creditModel.HolderName.split(" ");
        this.creditModel.userFirstName = Name[0];
        this.creditModel.userLastName = Name[1];
        this.creditModel.number = this.creditModel.Number.replace(/\s+/g, '');
        //изменить на последний день месяца
        this.creditModel.validThru = this.creditModel.ValidMonth + "-28-20" + this.creditModel.ValidYear;
    }

    validate(value) {
        //сделать нормально
        if (this.creditModel.Number.length == 4 || this.creditModel.Number.length == 9 || this.creditModel.Number.length == 14) {
            this.creditModel.Number += " ";
        }
    }
}
