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
        this.router.navigate(['/lotdetail', lotitem.id]);
    }
}
