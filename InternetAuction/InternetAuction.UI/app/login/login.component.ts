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
                                localStorage.setItem('currentUser', JSON.stringify({ username: this.model.username }));
                                this.router.navigate(['/']);
                            },
                            error => {
                                this.errorMessage = error;
                            });
    }
}