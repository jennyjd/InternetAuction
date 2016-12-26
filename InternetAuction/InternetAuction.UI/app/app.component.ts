import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from './user/user';
import { UserService } from './user/user.service';
import { LoginService } from './login/login.service';
import { SharedService } from './shared.service';
import { GeneralService } from './general.service';
import { LoadingComponent } from './loading/loading.component';
import { Constant } from './globals';

@Component({
    selector: 'my-app', 
    templateUrl: `${Constant.appPath}app/app.component.html`,
    styleUrls: [`${Constant.appPath}app/app.component.css`],
    providers: [SharedService, GeneralService],
    entryComponents: [LoadingComponent]
})

export class AppComponent {
    path = Constant.path;
    menu: any[] = [];
    lotStates: any;
    errorMessage: any;
    loading: boolean = true;
    selectedCategoryId = "none";
    opened_sidebar: boolean;
    isClient: boolean = false;
    categoryFocus: Array<boolean> = [];
    viewSearch: boolean = false;

    currentUser: any;
    title: "Auction";

    constructor(private userService: UserService,
                private loginService: LoginService,
                private router: Router,
                private sharedService: SharedService,
                private generalService: GeneralService) {

        this.opened_sidebar = true;
        localStorage.setItem("selected_category", JSON.stringify({ selected: "none" }));
        localStorage.setItem("loading", JSON.stringify(true));
        this.sharedService.saveSearch('');

        this.getCategories();
        this.getLotStates();
        this.getCurrency();

        router.events.subscribe((val) => {
            this.opened_sidebar = true;
            if (val.url != '/' && val.url != '/admin') {
                this.opened_sidebar = false;
            }
            if (val.url == '/') {
                this.viewSearch = true;
            }
            else { this.viewSearch = false;}
        });  
    }

    isUserHere() {
        this.isClient = false;
        let currentUser = this.userService.getCurrentUser();
        if (currentUser == null) {
            return false
        }
        if (currentUser.role == 'client') {
            this.isClient = true;
        }
        return true
    }

    getCurrency() {
        this.generalService.getCurrency()
            .subscribe(res => {
                localStorage.setItem('currency', JSON.stringify(res));
            },
            error => this.errorMessage = <any>error);
    }

    getLotStates() {
        this.generalService.getLotState()
            .subscribe(res => {
                localStorage.setItem('lotStates', JSON.stringify(res));
            },
            error => this.errorMessage = <any>error);
    }

    getCategories() {
        this.generalService.getCategories()
            .subscribe(res => {
                for (let cat of res) {
                    cat.status = true
                    this.menu.push(cat)
                }
                this.loading = false;
            },
            error => this.errorMessage = <any>error);
    }

    toggle(menu_element) {
        menu_element.status = !menu_element.status
    }

    search(searchStr) {
        console.log("ПОИСК");
        this.sharedService.saveSearch(searchStr);
    }

    selectCategory(categoryId) {
        if (typeof this.categoryFocus[categoryId] != 'undefined') {
            this.categoryFocus = [];
            localStorage.setItem("selected_category", JSON.stringify({ selected: "none" }));
            return;
        }
        this.categoryFocus = [];
        this.categoryFocus[categoryId] = !this.categoryFocus[categoryId];
        this.selectedCategoryId = categoryId;
        this.sharedService.saveSelected(this.selectedCategoryId);
    }

    isNotSubcategory(category) {
        if (category.ParentAuctionCategoryId === null) { return true }
        return false
    }

    changeSidnav() {
        this.opened_sidebar = !this.opened_sidebar;
    }

    logout() {
        this.loginService.logout()
            .subscribe(res => {
                localStorage.removeItem('currentUserId');
                this.router.navigate(['/login']);
            },
            error => this.errorMessage = <any>error);
    }

    selectUser() {
        console.log("SELECTION Current User ID" + this.userService.getCurrentUser());
        this.router.navigate(['/userdetail']);
    }

    redirect_main() {
        this.router.navigate(['/']);
    }
}
