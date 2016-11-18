import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user/user';
import { UserService } from './user/user.service';
import { LoginService } from './login/login.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
})

export class AppComponent{
    currentUser: any;
    title: "Auction";

    constructor(private userService: UserService, private loginService: LoginService, private router: Router) {
    }

    isUserHere() {
        if (this.userService.getCurrentUser() == null) {
            return false
        }
        return true
    }

    logout() {
        this.loginService.logout();
    }

    selectUser() {
        console.log("SELECTION Current User" + this.userService.getCurrentUser());
        this.router.navigate(['/userdetail']);
    }
}
