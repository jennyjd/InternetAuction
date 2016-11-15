import { Component } from '@angular/core';

import { User } from './user/user';
import { UserService } from './user/user.service';
import { LoginService } from './login/login.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
})

export class AppComponent {
    currentUser: User;
    title: "Auction";

    constructor(private userService: UserService, private loginService: LoginService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    logout() {
        this.loginService.logout();

    }
}
