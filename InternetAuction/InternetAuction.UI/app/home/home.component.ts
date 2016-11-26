import { Component } from '@angular/core';

import { LotListComponent } from '../lot/lot-list/lot-list.component';
import { CategoryService } from './category.service';
import { LotService } from '../lot/lot.service';

@Component({
    selector: 'home-page',
    templateUrl: './app/home/home.component.html',
    styleUrls: ['./app/home/home.component.css'],
    entryComponents: [LotListComponent],
    providers: [CategoryService, LotService]
})

export class HomeComponent {
    menu: any[] = [];
    errorMessage: any;
    selected_category = "none";

    constructor(private categoryService: CategoryService, private lotService: LotService) {
        this.getCategories();
        this.getLots();
    }

    getLots() {
        this.lotService.getLots()
            .subscribe(res => {
                console.log(res);
            },
            error => this.errorMessage = <any>error);
    }

    getCategories() {
        this.categoryService.getCategories()
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

