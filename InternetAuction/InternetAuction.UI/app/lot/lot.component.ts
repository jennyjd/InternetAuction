import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Lot } from './lot';

@Component({
    selector: 'lot',
    templateUrl: './app/lot/lot.component.html',
    styleUrls: ['./app/lot/lot.component.css']
})

export class LotComponent {
    @Input() selected: string;
    @Input() lotitem: Lot;

    constructor(private router: Router) { }

    view_details(lotitem: Lot) {
        lotitem.visible_items = false;
        this.router.navigate(['/lotdetail', lotitem.id]);
    }

    over(lotitem) {
        console.log("Over " + lotitem.title)
        lotitem.visible_items = true;
    }

    out(lotitem) {
        console.log("Out " + lotitem.title)
        lotitem.visible_items = false;
    }

}
