import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Constant } from '../globals';
import { UserService } from '../user/user.service'

@Component({
    selector: 'registration',
    templateUrl: `${Constant.appPath}app/registration/registration.component.html`,
    styleUrls: [`${Constant.appPath}app/registration/registration.component.css`]
})

export class RegistrationComponent {
    userModel: any = {};
    creditModel: any = {};
    loading = false;

    constructor(private router: Router, private userService: UserService) {
    }

    register() {
        this.loading = true;
        this.dataUpdate();
        this.userService.create(this.userModel, this.creditModel)
            .subscribe(
            res => {
                console.log("OK");
                console.log(res);
                this.router.navigate(['/login']);
            },
            error => {
                console.log("ERROR");
                this.loading = false;
            });
    }

    dataUpdate() {
        let Name = this.creditModel.HolderName.split(" ");
        this.creditModel.userFirstName = Name[0];
        this.creditModel.userLastName = Name[1];
        this.creditModel.Number = this.creditModel.Number.replace(/\s+/g, '');
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
