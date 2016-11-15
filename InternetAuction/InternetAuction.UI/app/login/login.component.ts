import { Component } from '@angular/core'
import { Router } from '@angular/router';

import { LoginService } from './login.service'
import { User } from '../user/user'

@Component({
    selector: 'login',
    templateUrl: './app/login/login.component.html',
    styleUrls: ['./app/login/login.component.css'],
    providers: [LoginService]
})

export class LoginComponent {

    constructor(private router: Router, private loginService: LoginService) {}

    loginUser(user:string, password:string) {
        console.log(user, password);
        this.loginService.login(user, password).subscribe(result => {
            console.log(result)
        });
    }
}