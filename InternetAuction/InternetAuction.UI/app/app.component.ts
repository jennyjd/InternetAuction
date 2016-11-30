import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from './user/user';
import { UserService } from './user/user.service';
import { LoginService } from './login/login.service';
import { SharedService } from './shared.service';
import { GeneralService } from './general.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
    providers: [SharedService, GeneralService]
    
})

export class AppComponent{
    menu: any[] = [];
    errorMessage: any;
    selected_category = "none";
    opened_sidebar: boolean;

    currentUser: any;
    title: "Auction";

    constructor(private userService: UserService,
                private loginService: LoginService,
                private router: Router,
                private sharedService: SharedService,
                private generalService: GeneralService) {

        this.opened_sidebar = true;
        localStorage.setItem("selected_category", JSON.stringify({ selected: "none" }));
        this.getCategories();
        router.events.subscribe((val) => {
            this.opened_sidebar = true;
            if (val.url != '/') {
                console.log(val);
                this.opened_sidebar = false;
            }
        });
    }

    isUserHere() {
        if (this.userService.getCurrentUser() == null) {
            return false
        }
        return true
    }

    getCategories() {
        this.generalService.getCategories()
            .subscribe(res => {
                for (let cat of res) {
                    cat.status = true
                    this.menu.push(cat)
                }
            },
            error => this.errorMessage = <any>error);
    }

    toggle(menu_element) {
        menu_element.status = !menu_element.status
    }

    selectCategory(category) {
        this.selected_category = category;
        this.sharedService.saveSelected(category);
    }

    isNotSubcategory(category) {
        if (category.ParentAuctionCategoryId === null) { return true }
        return false
    }

    changeSidnav() {
        this.opened_sidebar = !this.opened_sidebar;
    }

    isCategorySelected(category) {
        if (this.selected_category == category) {
            return true
        }
        return false
    }

    logout() {
        this.loginService.logout();
    }

    selectUser() {
        console.log("SELECTION Current User" + this.userService.getCurrentUser());
        this.router.navigate(['/userdetail']);
    }

    redirect_main() {
        this.router.navigate(['/']);
    }
}
