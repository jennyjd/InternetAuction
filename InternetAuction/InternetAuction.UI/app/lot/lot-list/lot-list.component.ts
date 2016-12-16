import { Component, Input } from '@angular/core'
import { LotComponent } from '../lot.component'
import { Lot } from '../lot'

import { LotService } from '../lot.service';
import { UserService } from '../../user/user.service';
import { SharedService } from '../../shared.service';
import { Constant } from '../../globals';
import { GeneralService } from '../../general.service';

@Component({
    selector: 'lot-list',
    templateUrl: `${Constant.appPath}app/lot/lot-list/lot-list.component.html`,
    styleUrls: [`${Constant.appPath}app/lot/lot-list/lot-list.component.css`],
    entryComponents: [LotComponent],
    providers: [LotService, UserService, SharedService]
})

export class LotListComponent {
    //lots = LOTS;
    errorMessage: any;
    lots: any[] = [];
    //@Input() selected: string;

    constructor(private lotService: LotService, private userService: UserService, private sharedService: SharedService,
        private generalService: GeneralService) {
        this.getLots();
        console.log(this.lots);
    }

    getLots() {
        this.lotService.getLots()
            .subscribe(res => {
                this.addData(res);
            },
            error => this.errorMessage = <any>error);
    }

    addData(res) {
        for (let lot of res) {
            this.userService.getUserAccountById(lot.ClientId)
                .subscribe(res => {
                    lot.userLogin = res.UserName;                        
                    this.getCurrentBet(lot);
                },
                error => this.errorMessage = <any>error)
        }; 
    }

    getCurrentBet(lot) {
        this.lotService.getCurrentBet(lot.Id)
            .subscribe(res => {
                lot.CurrentBet = res;

                if (lot.CurrentBet != 0) { lot.betDone = true }
                else { lot.betDone = false }

                lot.EndDate = new Date((Date.parse(lot.EndDate)));
                lot.EndDate.setHours(lot.EndDate.getHours() - 3);//GMT+03

                lot.mainPicture = "https://pp.vk.me/c419225/v419225009/6e41/vv2MqgXalNw.jpg";

                lot.CurrencyName = this.generalService.getCurrencyById(lot.CurrencyId).ShortName;
                console.log("Currency", lot.CurrencyName);
                this.lots.push(lot);
            },
            error => this.errorMessage = <any>error)
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
