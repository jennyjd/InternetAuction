import { Component } from '@angular/core';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core';

import { CategoryService } from '../../home/category.service';

@Component({
    selector: 'lot-create-form',
    templateUrl: './app/lot/lot-create/lot-create.component.html',
    styleUrls: ['./app/lot/lot-create/lot-create.component.css'],
    providers: [MdUniqueSelectionDispatcher, CategoryService]
})

export class LotCreateComponent {
    categories: any[] = [];
    errorMessage: any;
    selected_category = null;
    lot: any = {};

    constructor(private categoryService: CategoryService) {
        this.getCategories();
        console.log(this.categories);
    }

    getCategories() {
        this.categoryService.getCategories()
            .subscribe(res => {
                for (let cat of res) {
                    cat.status = true
                    this.categories.push(cat)
                }
            },
            error => this.errorMessage = <any>error);
    }

    isNotSubcategory(category) {
        if (category.ParentAuctionCategoryId === null) { return true }
        return false
    }

    toggle(category) {
        category.status = !category.status
        this.selectCategory(category)
    }

    selectCategory(category) {
        this.selected_category = category;
    }

    ifCategoryIsSelected() {
        if (this.selected_category === null) { return false }
        return true
    }

    createLot() {
        console.log("Name: " + this.lot.name + "\nState: " + this.lot.state);
    }
}