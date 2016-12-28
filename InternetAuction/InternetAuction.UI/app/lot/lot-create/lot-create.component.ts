import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core';

import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';
import { LotService } from '../lot.service';
import { Constant } from '../../globals';

@Component({
    selector: 'lot-create-form',
    templateUrl: `${Constant.appPath}app/lot/lot-create/lot-create.component.html`,
    styleUrls: [`${Constant.appPath}app/lot/lot-create/lot-create.component.css`],
    providers: [MdUniqueSelectionDispatcher, GeneralService, LotService]
})

export class LotCreateComponent {
    path = Constant.path;
    categories: any[] = [];
    currency: any[] = [];
    lotState: any[] = [];
    errorMessage: any;
    //mainPicture = 'http://designmyhome.ru/sites/default/files/images/mebel_ikea_03.jpg';
    selected_category = null;
    lot: any = {};
    minDate = new Date();
    categoryError: boolean = false;
    priceErrors: string[] = [];

    categoryFocus: Array<boolean> = [];

    /*pictures =
       ['https://s-media-cache-ak0.pinimg.com/736x/bb/bf/58/bbbf58c0716c059fa378d419defa0f05.jpg',
        'http://cliqueimg.com/cache/posts/169114/how-to-style-ikea-for-a-stunning-high-low-mix-1495982.640x0c.jpg',
        'http://houseplanning.ru/sites/default/files/images/ikea_4.jpg',
        'http://lookathome.ru/wp-content/uploads/2013/10/LookAtHome.ru_Mebel_IKEA_v_interiere-foto-3.jpeg']*/

    constructor(private generalService: GeneralService, private lotService: LotService, private router: Router,
        private sharedService: SharedService) {
        this.getCategories();
        this.getCurrency();
        this.getLotState();
        this.minDate.setHours(this.minDate.getHours() + 3);//3часа - минимальное время проведения аукциона
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
                for (let curr of res) {
                    this.currency.push(curr)
                }
            },
            error => this.errorMessage = <any>error);
    }

    getLotState() {
        this.generalService.getLotState()
            .subscribe(res => {
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
        //this.mainPicture = picture;
    }

    ifCategoryIsSelected() {
        if (this.selected_category === null) { return false }
        return true
    }

    createLot(startPrice, fastSell) {
        if (!this.validate(startPrice, fastSell)) {
            return;
        }
        else {
            this.lotService.createLot(this.lot)
                .subscribe(
                res => {
                    this.sharedService.saveSuccess(true);
                    this.router.navigate(['/lotdetail', res.Id]);
                },
                error => this.errorMessage = <any>error);
        }
    }

    validate(startPrice, fastSell) {
        this.priceErrors = [];
        let check = true;
        this.categoryError = false;
        if (this.lot.categoryId == undefined) {
            this.categoryError = true;
            check = false;
        }
        if (parseInt(startPrice.model) > parseInt(fastSell.model)) {
            this.priceErrors.push("Начальная цена должна быть меньше стоимость выкупа");
            check = false;
        }
        if (parseInt(startPrice.model) <= 0) {
            this.priceErrors.push("Начальная цена должна быть больше нуля");
            check = false;
        }
        if (parseInt(fastSell.model) <= 0) {
            this.priceErrors.push("Стоимость выкупа должна быть больше нуля");
            check = false;
        }
        return check;
    }

    chooseCategory(category) {
        this.lot.categoryId = category;

        this.categoryFocus = [];
        this.categoryFocus[category] = !this.categoryFocus[category];
    }
}