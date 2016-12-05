﻿import { Component, Input } from '@angular/core'
import { LotComponent } from '../lot.component'
import { Lot } from '../lot'

import { LotService } from '../lot.service';
import { UserService } from '../../user/user.service';;

@Component({
    selector: 'lot-list',
    templateUrl: './app/lot/lot-list/lot-list.component.html',
    styleUrls: ['./app/lot/lot-list/lot-list.component.css'],
    entryComponents: [LotComponent],
    providers: [LotService, UserService]
})

export class LotListComponent {
    //lots = LOTS;
    errorMessage: any;
    lots: any[] = [];
    //@Input() selected: string;

    constructor(private lotService: LotService, private userService: UserService) {
        this.getLots();
        console.log(this.lots);
    }

    getLots() {
        this.lotService.getLots()
            .subscribe(res => {
                console.log(res);
                this.addData(res);
            },
            error => this.errorMessage = <any>error);
    }

    addData(res) {
        for (let lot of res) {
            this.userService.getUserById(lot.ClientId)
                .subscribe(res => {
                    console.log(res);
                    lot.userLogin = res.FirstName;
                    lot.mainPicture = "https://pp.vk.me/c419225/v419225009/6e41/vv2MqgXalNw.jpg";
                    this.lots.push(lot);    
                },
                error => this.errorMessage = <any>error)
        }; 
    }
}

/*let LOTS: Lot[] = [
    {
        id: 1,
        title: "Комод",
        description: "Очень хороший комод Очень хорофывук вапки апвеы",
        starting_price: 2,
        picture_url: "http://www.mebelminsk.by/assets/images/company/moyamebel/4/komod%20julietta-1.jpg",
        visible_items: false,
        category: "Россия"
    },
    {
        id: 2,
        title: "Стул",
        description: "Очень хороший стул",
        starting_price: 10,
        category: "Россия",
        visible_items: false,
        picture_url: "https://ae01.alicdn.com/kf/HTB1678NLXXXXXaVXVXXq6xXFXXXA/The-Nordic-imported-white-oak-butterfly-font-b-chair-b-font-dining-font-b-chair-b.jpg"
    },
    {
        id: 3,
        title: "Шкаф",
        description: "Очень хороший шкаф",
        starting_price: 4,
        category: "Фантастика",
        visible_items: false,
        picture_url: "http://s.4pda.to/vePhL20ONebGKbOrDQSyOBC2od4N.jpg"
    },
    {
        id: 4,
        title: "Ваза",
        description: "Очень хорошая ваза",
        starting_price: 7,
        category: "Скульптура",
        visible_items: false,
        picture_url: "http://img.alicdn.com/imgextra/i1/T16fqKXnRyXXXmHsw9_102642.jpg"
    },
    {
        id: 5,
        title: "Ваза",
        description: "Очень хорошая ваза",
        starting_price: 7,
        category: "Скульптура",
        visible_items: false,
        picture_url: "http://img.alicdn.com/imgextra/i1/T16fqKXnRyXXXmHsw9_102642.jpg"
    },
    {
        id: 6,
        title: "Ваза",
        description: "Очень хорошая ваза",
        starting_price: 7,
        category: "Скульптура",
        visible_items: false,
        picture_url: "http://img.alicdn.com/imgextra/i1/T16fqKXnRyXXXmHsw9_102642.jpg"
    },
    {
        id: 7,
        title: "Ваза",
        description: "Очень хорошая ваза",
        starting_price: 7,
        category: "Скульптура",
        visible_items: false,
        picture_url: "http://img.alicdn.com/imgextra/i1/T16fqKXnRyXXXmHsw9_102642.jpg"
    }]*/
