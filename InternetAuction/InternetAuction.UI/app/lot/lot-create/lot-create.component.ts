import { Component } from '@angular/core';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core';

import { GeneralService } from '../../general.service';

@Component({
    selector: 'lot-create-form',
    templateUrl: './app/lot/lot-create/lot-create.component.html',
    styleUrls: ['./app/lot/lot-create/lot-create.component.css'],
    providers: [MdUniqueSelectionDispatcher, GeneralService]
})

export class LotCreateComponent {
    categories: any[] = [];
    currency: any[] = [];
    errorMessage: any;
    mainPicture = 'http://designmyhome.ru/sites/default/files/images/mebel_ikea_03.jpg';
    selected_category = null;
    lot: any = {};

    pictures =
       ['https://s-media-cache-ak0.pinimg.com/736x/bb/bf/58/bbbf58c0716c059fa378d419defa0f05.jpg',
        'http://cliqueimg.com/cache/posts/169114/how-to-style-ikea-for-a-stunning-high-low-mix-1495982.640x0c.jpg',
        'http://houseplanning.ru/sites/default/files/images/ikea_4.jpg',
        'http://lookathome.ru/wp-content/uploads/2013/10/LookAtHome.ru_Mebel_IKEA_v_interiere-foto-3.jpeg']

    constructor(private generalService: GeneralService) {
        this.getCategories();
        this.getCurrency();
    }

    getCategories() {
        this.generalService.getCategories()
            .subscribe(res => {
                for (let cat of res) {
                    cat.status = true
                    this.categories.push(cat)
                }
            },
            error => this.errorMessage = <any>error);
    }

    getCurrency() {
        this.generalService.getCurrency()
            .subscribe(res => {
                console.log("GET CUREENCY");
                console.log(res);
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

    changeMainPicture(picture) {
        this.mainPicture = picture;
    }

    ifCategoryIsSelected() {
        if (this.selected_category === null) { return false }
        return true
    }

    createLot() {
        console.log(this.lot);
    }

    chooseCategory(category) {
        this.lot.category = category;
    }
}