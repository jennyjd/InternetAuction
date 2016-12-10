import { Component } from '@angular/core'
import { Router } from '@angular/router';

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

    constructor(private router: Router, private loginService: LoginService) { }

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
                this.errorMessage = error;
            });
    }
}