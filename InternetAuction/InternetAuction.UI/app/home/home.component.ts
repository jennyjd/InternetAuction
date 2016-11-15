import { Component } from '@angular/core';

import { LotListComponent } from '../lot/lot-list/lot-list.component'

@Component({
    selector: 'home-page',
    templateUrl: './app/home/home.component.html',
    styleUrls: ['./app/home/home.component.css'],
    entryComponents: [LotListComponent]
})

export class HomeComponent {
    menu = MENU;
    selected_category = "none";

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

let MENU = [
    {
        category: "Монеты",
        sub: ["Россия", "Беларусь", "СССР"],
        status: true
    },
    {
        category: "Книги",
        sub: ["Фантастика", "Учебная литература", "Детские книги", "Художественная"],
        status: true
    },
    {
        category: "Исскуство",
        sub: ["Скульптура", "Живопись", " Икона", "Антикварные карты"],
        status: true
    }
]
