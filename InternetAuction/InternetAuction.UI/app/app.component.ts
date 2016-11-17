import { Component, OnInit } from '@angular/core';

import { User } from './user/user';
import { UserService } from './user/user.service';
import { LoginService } from './login/login.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
})

export class AppComponent implements OnInit{
    currentUser: User;
    title: "Auction";

    constructor(private userService: UserService, private loginService: LoginService) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("CURRENT USER = " + this.currentUser);
    }

    logout() {
        this.loginService.logout();
    }
}
