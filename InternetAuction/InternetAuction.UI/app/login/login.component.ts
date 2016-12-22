import { Component, AfterViewInit } from '@angular/core'
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { LoginService } from './login.service'
import { SharedService } from '../shared.service';
import { User } from '../user/user'
import { Constant } from '../globals';

@Component({
    selector: 'login',
    templateUrl: `${Constant.appPath}app/login/login.component.html`,
    styleUrls: [`${Constant.appPath}app/login/login.component.css`],
    providers: [LoginService]
})

export class LoginComponent implements AfterViewInit  {
    model: any = {};
    loading = false;
    errorMessage: string;

    constructor(private router: Router, private loginService: LoginService, private notifService: NotificationsService,
        private sharedService: SharedService) {
     
    }

    ngAfterViewInit() {
        console.log(this.sharedService.getSuccess());
        if (this.sharedService.getSuccess()) {
            this.successRegistrNotif();
        }
        this.sharedService.saveSuccess(false);
    }

    loginUser() {
        this.errorMessage = '';
        console.log(this.model.username, this.model.password);
        this.loginService.login(this.model)
            .subscribe(
            res => {
                if (res.ClientId === undefined) {
                    localStorage.setItem('currentUserId', JSON.stringify({ Id: res.ClientId, role: 'admin' }));
                    this.router.navigate(['/admin']);
                }
                else {
                    localStorage.setItem('currentUserId', JSON.stringify({ Id: res.ClientId, role: 'client' }));
                    this.router.navigate(['/']);
                }
            },
            error => {
                this.errorNotif();
                this.errorMessage = error;
            });
    }

    successRegistrNotif() {
        this.notifService.success(
            'Успех!',
            'Регистрация прошла успешно!',
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

    errorNotif() {
        this.notifService.error(
            'Ошибка!',
            'Аккаунт не существует',
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
}