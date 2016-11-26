import { Component, Input } from '@angular/core'
import { LotComponent } from '../lot.component'
import { Lot } from '../lot'

@Component({
    selector: 'lot-list',
    templateUrl: './app/lot/lot-list/lot-list.component.html',
    styleUrls: ['./app/lot/lot-list/lot-list.component.css'],
    entryComponents: [LotComponent]
})

export class LotListComponent {
    lots = LOTS;
    @Input() selected: string;
}

let LOTS: Lot[] = [
    {
        id: 1,
        title: "Комод",
        description: "Очень хороший комод",
        starting_price: 2,
        picture_url: "http://www.mebelminsk.by/assets/images/company/moyamebel/4/komod%20julietta-1.jpg",
        category: "Россия"
    },
    {
        id: 2,
        title: "Стул",
        description: "Очень хороший стул",
        starting_price: 10,
        category: "Россия",
        picture_url: "https://ae01.alicdn.com/kf/HTB1678NLXXXXXaVXVXXq6xXFXXXA/The-Nordic-imported-white-oak-butterfly-font-b-chair-b-font-dining-font-b-chair-b.jpg"
    },
    {
        id: 3,
        title: "Шкаф",
        description: "Очень хороший шкаф",
        starting_price: 4,
        category: "Фантастика",
        picture_url: "http://s.4pda.to/vePhL20ONebGKbOrDQSyOBC2od4N.jpg"
    },
    {
        id: 4,
        title: "Ваза",
        description: "Очень хорошая ваза",
        starting_price: 7,
        category: "Скульптура",
        picture_url: "http://img.alicdn.com/imgextra/i1/T16fqKXnRyXXXmHsw9_102642.jpg"
    }]
