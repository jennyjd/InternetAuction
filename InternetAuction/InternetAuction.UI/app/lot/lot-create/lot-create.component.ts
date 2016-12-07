import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core';

import { GeneralService } from '../../general.service';
import { LotService } from '../lot.service';

@Component({
    selector: 'lot-create-form',
    templateUrl: './app/lot/lot-create/lot-create.component.html',
    styleUrls: ['./app/lot/lot-create/lot-create.component.css'],
    providers: [MdUniqueSelectionDispatcher, GeneralService, LotService]
})

export class LotCreateComponent {
    categories: any[] = [];
    currency: any[] = [];
    lotState: any[] = [];
    errorMessage: any;
    mainPicture = 'http://designmyhome.ru/sites/default/files/images/mebel_ikea_03.jpg';
    selected_category = null;
    lot: any = {};

    pictures =
       ['https://s-media-cache-ak0.pinimg.com/736x/bb/bf/58/bbbf58c0716c059fa378d419defa0f05.jpg',
        'http://cliqueimg.com/cache/posts/169114/how-to-style-ikea-for-a-stunning-high-low-mix-1495982.640x0c.jpg',
        'http://houseplanning.ru/sites/default/files/images/ikea_4.jpg',
        'http://lookathome.ru/wp-content/uploads/2013/10/LookAtHome.ru_Mebel_IKEA_v_interiere-foto-3.jpeg']

    constructor(private generalService: GeneralService, private lotService: LotService, private router: Router) {
        this.getCategories();
        this.getCurrency();
        this.getLotState();
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
                for (let curr of res) {
                    this.currency.push(curr)
                }
            },
            error => this.errorMessage = <any>error);
    }

    getLotState() {
        this.generalService.getLotState()
            .subscribe(res => {
                console.log("GET LOT STATE");
                console.log(res);
                for (let state of res) {
                    this.lotState.push(state)
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

    changeMainPicture(picture) {
        this.mainPicture = picture;
    }

    ifCategoryIsSelected() {
        if (this.selected_category === null) { return false }
        return true
    }

    createLot() {
        this.lotDataChange();
        console.log(this.lot);
        this.lotService.createLot(this.lot)
            .subscribe(
            res => {
                console.log("OK");
                console.log(res);
                this.router.navigate(['/']);
            },
            error => this.errorMessage = <any>error);
    }

    lotDataChange() {
        let date = this.lot.endDate.split("-");
        this.lot.endDate = date[1] + "-" + date[2] + "-" + date[0];
    }

    chooseCategory(category) {
        this.lot.categoryId = category;
    }
}