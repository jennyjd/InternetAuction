import { Component } from '@angular/core';

import { LotListComponent } from '../lot/lot-list/lot-list.component';
import { CategoryService } from './category.service';

@Component({
    selector: 'home-page',
    templateUrl: './app/home/home.component.html',
    styleUrls: ['./app/home/home.component.css'],
    entryComponents: [LotListComponent],
    providers: [CategoryService]
})

export class HomeComponent {
    menu: any[] = [];
    errorMessage: any;
    selected_category = "none";

    constructor(private categoryService: CategoryService) {
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
        console.log(menu_element.status)
    }

    selectCategory(category) {
        this.selected_category = category;
    }

    isCategorySelected(category) {
        if (this.selected_category == category) {
            return true
        }
        return false
    }
}

