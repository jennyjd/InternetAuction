import { Component, DoCheck } from '@angular/core';

import { LotListComponent } from '../lot/lot-list/lot-list.component';
import { LotService } from '../lot/lot.service';
import { SharedService } from '../shared.service';
import { GeneralService } from '../general.service';
import { Constant } from '../globals';

@Component({
    selector: 'home-page',
    templateUrl: `${Constant.appPath}app/home/home.component.html`,
    styleUrls: [`${Constant.appPath}app/home/home.component.css`],
    entryComponents: [LotListComponent],
    providers: [LotService, SharedService, GeneralService]
})

export class HomeComponent{
    menu: any[] = [];
    errorMessage: any;
    selected_category = "none";

    constructor(private lotService: LotService,
        private sharedService: SharedService,
        private generalService: GeneralService) {

        this.getCategories();
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
    }

    isNotSubcategory(category) {
        if (category.ParentAuctionCategoryId === null) { return true }
        return false
    }

    isCategorySelected(category) {
        if (this.selected_category == category) {
            return true
        }
        return false
    }
}

