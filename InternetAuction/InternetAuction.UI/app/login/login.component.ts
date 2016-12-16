import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { LoginService } from './login.service'
import { User } from '../user/user'
import { Constant } from '../globals';

@Component({
    selector: 'login',
    templateUrl: `${Constant.appPath}app/login/login.component.html`,
    styleUrls: [`${Constant.appPath}app/login/login.component.css`],
    providers: [LoginService]
})

export class LoginComponent {
    model: any = {};
    loading = false;
    errorMessage: string;

    constructor(private router: Router, private loginService: LoginService, private notifService: NotificationsService) { }

    loginUser() {
        this.errorMessage = '';
        console.log(this.model.username, this.model.password);
        this.loginService.login(this.model)
            .subscribe(
            res => {
                console.log("Вы вошли в систему");
                console.log(res.ClientId);
                localStorage.setItem('currentUserId', JSON.stringify({ Id: res.ClientId }));
                this.router.navigate(['/']);
            },
            error => {
                this.errorNotif();
                this.errorMessage = error;
            });
    }

    errorNotif() {
        this.notifService.error(
            'Ошибка!',
            'Аккаунт не существует',
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
}